var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('Bienvenido');
});

socket.on('disconnect', function() {
    console.log('Fuera de línea');
});

socket.on('estadoActual', function(data) {
    actualizaHtml(data);
});

socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(_ => {

            })
            .catch(error => {
                console.log('Error con la reproducción.');
            });
    }
    actualizaHtml(data);
});

function actualizaHtml(data) {
    data.ultimos4.forEach((element, index) => {
        $(`#lblTicket${index+1}`).text("Ticket " + element.numero);
        $(`#lblEscritorio${index+1}`).text("Escritorio " + element.escritorio);
    });
}