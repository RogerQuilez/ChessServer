/* Creamos el servidor Socket */
var express = require('express');
var path = require("path");
var app = express();
var server = require('http').Server(app);
var mysql = require('mysql'); //base de datos
var ip = require('ip');

//Establecemos conexion con la BBDD del Marianao
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    //socketPath: '/opt/lampp/var/mysql/mysql.sock',
    database: 'chess-web'
});

/* Servidor Socket */
var io = require('socket.io')(server, {
    /* Añadimos lo de cors por el tema de la privacidad */
    cors: {
        origin: "http://192.168.110.252:5000",
        methods: ["GET", "POST"]
    }
});

/* Middleware de express entre servidor y el cliente */
app.use("/app", express.static(path.join(__dirname, '../app')));

/* Tablero Inicial con la posición de las piezas que se va a asignar siempre que se cree una sala */
const initialBoard = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
]

/* Clase room, se creará cuando se genere una nueva sala */
class Room {
    board;
    current;
    players;
}

/* Array de Rooms*/
const rooms = {};

/* Definimos que en el evento "connection" se hagan las siguientes funciones */
io.on('connection', function (socket) {

    socket.emit('connected', 'hello!');

    /* Función que iniciará el tablero en la nueva sala y mirará cuantos usuarios se encuentran en la sala */
    socket.on('join room', function (roomId) {

        socket.roomId = roomId;
        var sala = '%' + roomId + '%';
        var results = [];

        connection.query('SELECT id_sala FROM c_user WHERE id_sala LIKE ?', [sala], function (error, result, fields) {

            var emailRepetido = false;

            if (result) {

                result.forEach((res) => {
                    results.forEach((result) => {
                        if (res.id_sala == result) emailRepetido = true;

                    })

                    if (!emailRepetido) results.push(res.id_sala);
                })

                /* Si la sala no ha sido creada ya, inicializamos el tablero y los players */
                if (!rooms[roomId]) {
                    rooms[roomId] = {
                        board: JSON.parse(JSON.stringify(initialBoard)),
                        players: [],
                        current: 0
                    };
                }

                /* En caso de que haya más de dos jugadores en la sala no se le permitirá entrar */
                if (rooms[roomId].players.length == 2) return;

                rooms[roomId].players.push(socket);

                if (rooms[roomId].players.length == 2) {
                    rooms[roomId].players.forEach((socket) => {
                        socket.emit('match', 'Partida encontrada!');
                    })

                }

                for (let i = 0; i < results.length; i++) {
                    let arrayEmail = results[i].split("-");
                    let email = arrayEmail[1];
                    if (rooms[roomId].players[i]) rooms[roomId].players[i].email = email;
                }

                /* Añadimos al jugador a la sala */
                socket.join(roomId);

                /* Inicializamos el tablero en la sala */
                socket.emit('init board', rooms[roomId].board);

                /* Lógica de inicio de juego */
                if (rooms[roomId].players.length == 2) {

                    const { players } = rooms[roomId];

                    /* Permite dar un valor "cara o cruz" para definir los colores de los jugadores */
                    if (Math.random() > 0.5) {

                        rooms[roomId].current = 1;

                        /* Indicamos los colores y los turnos a los jugadores */
                        players[0].emit('black player');
                        players[0].color = 'dark';
                        players[1].emit('turn');
                        players[1].color = 'light';

                        connection.query('UPDATE c_user SET currentColor = ? WHERE email = ?', ['dark', players[0].email]);
                        connection.query('UPDATE c_user SET currentColor = ? WHERE email = ?', ['light', players[1].email]);

                    } else {

                        /* Indicamos los colores y los turnos a los jugadores */
                        players[0].emit('turn');
                        players[0].color = 'light';
                        players[1].emit('black player');
                        players[1].color = 'dark';

                        connection.query('UPDATE c_user SET currentColor = ? WHERE email = ?', ['dark', players[1].email]);
                        connection.query('UPDATE c_user SET currentColor = ? WHERE email = ?', ['light', players[0].email]);
                    }
                }
            }
        });


    })

    /* Función que servirá para que los dos jugadores vean los movimientos realizados */
    socket.on('move', function ([prev, next]) {

        /* Cogemos el roomId del socket */
        const { roomId } = socket;

        /* En caso de que no haya, salimos de la función */
        if (!roomId) return;

        const room = rooms[roomId];

        /* Pieza de la celda (iNext, jNext) que hay que mover */
        const [iNext, jNext] = next;

        /* Celda a la que se ha de mover la pieza */
        const [iPrev, jPrev] = prev;

        /* Si no existe la sala, salimos de la función */
        if (!room) return;

        /* Mueve la pieza a la casilla seleccionada */
        room.board[iNext][jNext] = room.board[iPrev][jPrev];

        /* Pone a null la pieza de la celda que se ha movido anteriormente */
        room.board[iPrev][jPrev] = null;

        /* Enviamos a la sala correspondiente el movimiento */
        io.to(roomId).emit('move', [prev, next]);

        /* Cambiamos el turno del jugador actual */
        room.current = room.current ? 0 : 1;

        /* Enviamos la función 'turn' */
        room.players[room.current].emit('turn');

    })

    socket.on('checkMate', function (cellKing) {
        if (cellKing.piece.color != socket.color) {
            connection.query('UPDATE c_user SET elo = elo + ?, wins = wins + ? WHERE email = ?', [20, 1, socket.email]);
        } else {
            connection.query('UPDATE c_user SET elo = elo - ?, loses = loses + ? WHERE email = ?', [20, 1, socket.email]);
        }

    })

    socket.on('tablas', function(){
        connection.query('UPDATE c_user SET elo = elo + ?, tables = tables + ? WHERE email = ?', [5, 1, socket.email]);
    })

    /* Eliminamos al socket actual que se ha desconectado de la sala */
    socket.on('disconnect', function () {
        
        const socketRooms = [...socket.rooms];
        socketRooms.forEach((r) => {
            if (!rooms[r]) return;
            rooms[r].players = rooms[r].players.filter((p) => p != socket);

            io.to(r).emit('player left');

            /* Eliminamos la sala en caso de que no queden jugadores */
            if (rooms[r].players.length === 0) delete rooms[r];
            
        });
    })
});

/* Comprobamos el servidor */
server.listen(5000, '0.0.0.0', function () {
    console.log("servidor encendido en el puerto 5000");
});


