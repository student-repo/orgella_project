var express = require('express');
var mysql = require('mysql');
var app =  express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var md5 = require('md5');

server.listen(process.env.PORT || 3200);
console.log('Server running...');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'orgella'
});

var foo;


// connection.connect();
// connection.query('select * from offers', function(err, result){
//     foo = result;
// });
//
// console.log(foo);


io.on('connection', function(socket){
    // // var a = " where Description = 'opis'";
    // var l = "100";
    // // var productName = " where ProductName like '%" + l + "%'";
    // var productName = " where Price > " + l;
    // connection.query('select ProductName, Category, Description, Price from offers' + productName, function(err, result){
    //     console.log(result);
    // });

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
        var salt = Math.random().toString(36).substring(7);
        var pass = md5(data.password + salt);
        var aaa = {
            Nick: data.nick,
            FirstName: data.firstName,
            LastName: data.lastName,
            Password: pass,
            PasswordSalt: salt,
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


    socket.on('ADD_OFFER_DATA', function(data){
        console.log(data);
        connection.query('select UserID from users where Nick=?',data.UserNick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('ADD_OFFER_RESPONSE', {res: "ADD_OFFER_NOT_SUCCESSFUL"});
                return;
            }
            var aaaaaa = {
                SellerID: result[0].UserID,
                ProductName: data.ProductName,
                Category: data.Category,
                Description: data.Description,
                Price: data.Price,
                ProductQuantity: data.ProductQuantity
            };
            var query = connection.query('insert into offers set ?', aaaaaa, function(err, result){
                if(err){
                    console.error(err);
                    io.sockets.emit('ADD_OFFER_RESPONSE', {res: "ADD_OFFER_NOT_SUCCESSFUL"});
                    return;
                }
                var offerID = query["_results"][0]["insertId"];

                data.shipmentPossibility.map(key => {
                    connection.query('insert into offer_details set ?', {OfferID: offerID, ShipmentType: key}, function(err, result){
                        if(err){
                            console.error(err);
                            io.sockets.emit('ADD_OFFER_RESPONSE', {res: "ADD_OFFER_NOT_SUCCESSFUL"});
                            return;
                        }
                    });
                });
                console.error(err);
                io.sockets.emit('ADD_OFFER_RESPONSE', {res: "ADD_OFFER_SUCCESSFUL"});
            });
        });
    });

    socket.on('SEARCH', function(data){
        console.log(data);
        var queryQuery = "select ProductName, Category, Description, Price, ProductQuantity from offers where ProductName like '%" + data.ProductName + "%' and ";
        if(data.PriceFrom === '' && data.PriceTo === ''){
            queryQuery += "Category like '%" + data.Category + "%'"
        }
        else if(data.PriceFrom === '' && data.PriceTo !== ''){
            queryQuery += "Category like '%" + data.Category + "%' and Price <= " + data.PriceTo;
        }
        else if(data.PriceFrom !== '' && data.PriceTo === ''){
            queryQuery += "Category like '%" + data.Category + "%' and Price >= " + data.PriceFrom;
        }
        else if(data.PriceFrom !== '' && data.PriceTo !== ''){
            queryQuery += "Category like '%" + data.Category + "%' and Price >= " + data.PriceFrom +
            " and Price <= " + data.PriceTo;
        }
        connection.query(queryQuery, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('SEARCH_RESPONSE', {res: "SEARCH_NOT_SUCCESSFUL"});
                return;
            }
            else{
                io.sockets.emit('SEARCH_RESPONSE', {res: "SEARCH_SUCCESSFUL",
                    data: result
                });
            }
        });
    });


    socket.on('TRY_SIGN_IN', function(data){
        console.log(data);
        connection.query('select Password, PasswordSalt from users where Nick=?',data.nick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                return;
            }
            else if(result.length !== 1){
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");
            }
            else if(result[0].Password === md5(data.password + result[0].PasswordSalt)){
              console.log("login successfully");
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_SUCCESSFULLY"});

            }
            else{
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");


            }
        });
    });

    socket.on('CHECK_COOKIE_IDENTITY_DATA', function(data){
        console.log(data);
        connection.query('select Password, PasswordSalt from users where Nick=?',data.nick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                return;
            }
            else if(result.length !== 1){
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log("login not successfully");
            }
            else if(result[0].Password === md5(data.password + result[0].PasswordSalt)){
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