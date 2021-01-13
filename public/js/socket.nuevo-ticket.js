//Comando para establecer la comunicación
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Bienvenido');
});

socket.on('disconnect', function() {
    console.log('Fuera de línea');
});

socket.on('estadoActual', function(res) {
    setTimeout(() => {
        label.text(res.actual);
    }, 3000);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});