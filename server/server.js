var express = require('express');
var mysql = require('mysql');
var app =  express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(process.env.PORT || 3200);
console.log('Server running...');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'orgella'
});

var foo;

connection.connect();
connection.query('select * from users', function(err, result){
    foo = result;
});


io.on('connection', function(socket){
    console.log("i get connection");
    io.sockets.emit('new message', {msg: "message, its working my gentleman",
                                        res: foo});
    socket.on('foo', function(data){
        console.log(foo);
        io.sockets.emit('new message', {msg: "message, its working my gentleman",
            res: foo});
    });

    socket.on('REGISTER_DATA', function(data){
        io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_SUCCESSFUL"});
    })
});

// io.on('foo', function(socket){
//     console.log("i got new user");
//     // io.sockets.emit('new new', {msg: "hohoho hohoho"})
// });