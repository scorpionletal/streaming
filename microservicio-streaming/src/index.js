'user strict';
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

var publicDir = `${__dirname}/public`;

http.listen(port, ()=>{
    console.log('iniciando express y Socket.io en localhost:%d',port);
});

app.get('/', (req, res) => {
    res.sendFile(`${publicDir}/client.html`)
});

app.get('/streaming', (req, res) => {
    res.sendFile(`${publicDir}/server.html`);
});

io.on('connection',(socket)=>{
    socket.on('streaming', (image)=>{
        io.emit('play stream', image);
       
    });
});