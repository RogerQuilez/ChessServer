/**
 * Controlador de autenticación y session de: Chess-Web
 * @author Marc Mateo
 * @author Roger Quilez
 * @author Angel Guardeño
 * @version 1.0
 * 
 */

var mysql = require('mysql'); //base de datos
var express = require('express'); //autenticacion por sesion
var path = require('path');
var app = express();
var session = require('express-session'); //autenticacion por sesion
var bodyParser = require('body-parser'); //recoger datos de los formularios
var exphbs = require('express-handlebars');
var fileUpload = require('express-fileupload');
var bcrypt = require('bcrypt');
const { equal, match } = require('assert');
var server = server = require('http').Server(app);
var ip = require('ip');

// Servidor socket
var io = require('socket.io')(server);

//var nodemailer = require('nodemailer'); //Enviar mails

//Establecemos conexion con la BBDD
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    //socketPath: '/opt/lampp/var/mysql/mysql.sock',
    database: 'chess-web'
});

//Establecemos conexion con la BBDD del Marianao
/*var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'cfgs',
    password: 'ira491',
    port: 3306,
    socketPath: '/opt/lampp/var/mysql/mysql.sock',
    database: 'cfgs'
});*/

connection.connect((err) => {
    if (err) throw err;
    console.log('Conexión BBDD: ' + "OK".green);
});


//Definimos la sesión
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Con esta opcion recogemos los parametros enviados de un formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definimos las vistas ejs y los estilos
app.use(express.static(__dirname + '/views'));
app.set('views', [path.join(__dirname, 'views'),
path.join(__dirname, 'views/chesstream/')]);
app.set('view engine', 'ejs');
app.use(fileUpload());


//Mapeamos y tratamos las peticiones GET POST


//Peticiones GET
app.get('/', function (request, response) {
    if (request.session.loggedin) {
        response.redirect("/index");
    } else {
        response.render("login", { error: 0 });
    }
});

app.get('/login', function (request, response) {
    if (request.session.loggedin) {
        response.redirect("/index");
    } else {
        response.render("login", { error: 0 });
    }
});

app.get('/logout', function (request, response) {
    if (request.session.loggedin) {
        request.session.destroy();
        response.render("login", { error: 0 });
    } else {
        response.render("login", { error: 0 });
    }
});
app.get('/index', function (request, response) {
    if (request.session.loggedin) {
        connection.query('SELECT * FROM c_user WHERE email = ?', [request.session.email], function (error, user, fields) {
            request.session.user = user;
            response.render("index", { user: request.session.user });
        })
    } else {
        response.render("login", { error: 0 });
    }
});

app.get('/register', function (request, response) {
    if (request.session.loggedin) {
        response.redirect("/index");
    } else {
        response.render('register', { error: 0 });
    }
});

app.get('/updateImage', function (request, response) {
    if (request.session.loggedin) {
        response.redirect("/updateUser");
    } else {
        response.render('login', { error: 0 });
    }
});

app.get('/updateUser', function (request, response) {
    if (request.session.loggedin) {
        connection.query('SELECT * FROM c_user WHERE username = ?', [request.session.username], function (error, user, fields) {
            request.session.user = user;
            response.render("updateUser", { user: request.session.user });
        })
    } else {
        response.render('login', { error: 0 });
    }
});


app.get('/chesstream', function (request, response) {
    response.render('index_stream');
});

app.get('/aprender', function (request, response) {
    response.render('aprender', { user: request.session.user });
});

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var room = 0;

for (var i = 0; i < 20; i++)
    room += possible.charAt(Math.floor(Math.random() * possible.length));

var playersLength = 0;
app.get('/play', function (request, response) {

    playersLength++;
    connection.query('UPDATE c_user SET id_sala = ? WHERE email = ?', [room + "-" + request.session.email, request.session.email]);
    response.redirect("http://"+ip.address()+":5000/app/?room=" + room);

    if (playersLength % 2 == 0) {
        room = 0;
        for (var i = 0; i < 20; i++)
            room += possible.charAt(Math.floor(Math.random() * possible.length));
    };

});

//Peticiones POST

app.post('/login', function (request, response) {
    var email = request.body.email;
    //Desencriptamos la password
    if (email && request.body.password) {
        connection.query('SELECT * FROM c_user WHERE email = ?', [email], function (error, user, fields) {
            if (user.length > 0) {
                const verifyPassword = bcrypt.compareSync(request.body.password, user[0]['password']);
                if (verifyPassword === true) {
                    connection.query('SELECT * FROM c_user WHERE email = ?', [email], function (error, user, fields) {
                        if (user.length > 0) {
                            request.session.loggedin = true;
                            request.session.user = user;
                            request.session.email = email;
                            request.session.username = user[0]['username'];
                            id_jugadorCola = request.session.user[0]['email'];
                            elo = request.session.user[0]['elo'];
                            response.render("index", { user: user });
                        } else {
                            response.render("login", { error: 1 });

                        }
                    })
                } else {
                    response.render("login", { error: 1 });
                }
            } else {
                response.render("login", { error: 1 });
            }

        });
    } else {
        response.render("login", { error: 2 });
    }
})

app.post('/logout', function (request, response) {
    request.session.destroy();
    response.render("login", { error: 0 });
});

app.post('/register', function (request, response) {
    //Encriptamos la password
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(request.body.password, saltRounds);
    var values = [
        ["'" + request.body.name + "'"],
        ["'" + request.body.lastname + "'"],
        ["'" + request.body.username + "'"],
        ["'" + encryptedPassword + "'"],
        ["'" + request.body.email + "'"],
    ];
    connection.query("SELECT * FROM c_user WHERE email =  ?", [request.body.email], function (error, user, fields) {
        if (user.length > 0) {
            response.render("register", { error: 1 });
        } else {
            connection.query("INSERT INTO c_user (name,lastname,username,password,email) VALUES (" + values + ")");
            response.render("login", { error: 0 });
        }
    });

});

app.post('/updateUser', function (request, response) {
    var name = request.body.name;
    var lastname = request.body.lastname;
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(request.body.password, saltRounds);
    //Encriptamos la password
    var id;

    connection.query('SELECT * FROM c_user WHERE email = ?', [request.session.email], function (error, user, fields) {
        id = '' + user[0]['id'];
        const verifyPassword = bcrypt.compareSync(request.body.passwordConfirm, user[0]['password']);
        if (verifyPassword === true) {
            if (user.length > 0) {
                connection.query("UPDATE c_user SET date_update=CURRENT_TIMESTAMP");
                if (name.length > 0) {
                    connection.query('UPDATE c_user SET name = ? WHERE id = ?', [name, id])
                }
                if (lastname.length > 0) {
                    connection.query('UPDATE c_user SET lastname = ? WHERE id = ?', [lastname, id])
                }
                if (request.body.password.length > 0) {
                    connection.query('UPDATE c_user SET password = ? WHERE id = ?', [encryptedPassword, id])
                }
                connection.query('SELECT * FROM c_user WHERE username = ? AND id = ?', [request.session.username, id], function (error, user, fields) {
                    request.session.user = user;
                    response.redirect("/updateUser");
                })
            } else {
                response.redirect("/updateUser");
            }
        } else {
            response.redirect("/updateUser");
        }
    })
});

app.post('/updateImage', function (request, response) {
    var sampleFile;
    var uploadPath;
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No hay imagen para actualizar');
    }

    //El nombre del input es file
    sampleFile = request.files.file;
    uploadPath = __dirname + '/views/img_profile/' + request.session.email + '.jpg';
    //usamos mv() para mover la imagen al servidor
    sampleFile.mv(uploadPath, function (error) {
        if (error) {
            return response.status(500).send(error);
        }
        connection.query('UPDATE c_user SET profile_image = ? WHERE email = ?', [request.session.email, request.session.email], function (error, user, fields) {
            if (!error) {
                connection.query('SELECT * FROM c_user WHERE username = ?', [request.session.username], function (error, user, fields) {
                    request.session.user = user;
                })
                response.redirect("/updateUser");
            } else {
                response.redirect("/updateUser");
            }
        })
    })


})

//Pagina NOT FOUND
app.use(function (request, response, next) {
    response.status(404);
    response.render('404', { url: request.url });
    return;
});


//Definimos el puerto
const colors = require('colors');
//const { request } = require('express');
//const { emit } = require('process');
//const { socket } = require('./ChessServer/app/socket');
server.listen(5003, '0.0.0.0', function () {
    console.log("Servidor arrancado");
});