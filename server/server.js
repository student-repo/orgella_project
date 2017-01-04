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
        console.log(data);
        var aaa = {
            Nick: data.nick,
            FirstName: data.firstName,
            LastName: data.lastName,
            Password: data.password,
            PasswordSalt: "passwordSalt",
            Address: data.address
        };
        var query = connection.query('insert into users set ?', aaa, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_NOT_SUCCESSFUL"});
                return;
            }
            console.error(err);
            io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_SUCCESSFUL"});
        });
        // io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_SUCCESSFUL"});
    });

    socket.on('TRY_SIGN_IN', function(data){
        console.log(data);
        connection.query('select Password from users where Nick=?',data.nick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                return;
            }
            else if(result.length !== 1){
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");
            }
            else if(result[0].Password === data.password){
              console.log("login successfully");
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_SUCCESSFULLY"});

            }
            else{
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");


            }
            // console.log(result[0].Password);
            // console.log(result);
            // console.log(result.length);
            // io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFUL"});

        });

        //
        // io.sockets.emit('new message', {msg: "message, its working my gentleman",
        //     res: foo});
    });

    socket.on('CHECK_COOKIE_IDENTITY_DATA', function(data){
        console.log(data);
        connection.query('select Password from users where Nick=?',data.nick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                return;
            }
            else if(result.length !== 1){
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");
            }
            else if(result[0].Password === data.password){
                console.log("login successfully");
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_SUCCESSFULLY"});

            }
            else{
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");


            }
            // console.log(result[0].Password);
            // console.log(result);
            // console.log(result.length);
            // io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFUL"});

        });

        //
        // io.sockets.emit('new message', {msg: "message, its working my gentleman",
        //     res: foo});
    });
});

// io.on('foo', function(socket){
//     console.log("i got new user");
//     // io.sockets.emit('new new', {msg: "hohoho hohoho"})
// });