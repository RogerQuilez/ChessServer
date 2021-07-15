/* Connectar servidor socket , con objeto de configuracion , cuando entremos a http://localhost:8080 enviara el mensaje connection al servidor */
var socket = io.connect('http://192.168.110.252:5000', { 'forceNew ': true });

/* Exportamos la variable de la roomId de la URL */
export const roomId = window.location.search.split('room=')[1];

/* Cuando reciba el evento connected se ejecutara */
socket.on('connected', function () {

    /* Obtenemos la key de la room con window.location.search */
    const roomId = window.location.search.split('room=')[1];

    /* Le enviamos la sala del cliente al servidor */
    socket.emit('join room', roomId);
});

export { socket };
