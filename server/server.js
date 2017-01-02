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
    password: 'dn12081995',
    database: 'articles'
});

var foo;

connection.connect();
connection.query('select * from articles', function(err, result){
    foo = result;
});


io.on('connection', function(socket){
    console.log("i get connection");
    // io.sockets.emit('new message', {msg: "message, its working my gentleman",
    //                                     res: foo});
    socket.on('foo', function(data){
        console.log(foo);
    })
});

// io.on('foo', function(socket){
//     console.log("i got new user");
//     // io.sockets.emit('new new', {msg: "hohoho hohoho"})
// });