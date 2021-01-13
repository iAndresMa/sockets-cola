//Comando para establecer la comunicación
var socket = io();

socket.on('connect', function() {
    console.log('Bienvenido');
});

socket.on('disconnect', function() {
    console.log('Fuera de línea');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('EEl escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, function(res) {
        if (res === 'No hay tickets') {
            label.text(res);
            alert(res);
            return;
        }
        label.text('Ticket ' + res.numero);
    });
});