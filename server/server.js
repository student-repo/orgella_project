var express = require('express');
var mysql = require('mysql');
var app =  express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var md5 = require('md5');
var _ = require('underscore');

server.listen(process.env.PORT || 3200);
console.log('Server running...');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'orgella2'
    // multipleStatements: true
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

    connection.query('SELECT * FROM offers', function(err, result){
        if(err){
            console.error(err);
            return;
        }
        else{
            connection.query('SELECT * FROM shipments', function(err, result2){
                if(err){
                    console.error(err);
                    return;
                }
                else{
                    io.sockets.emit('INITIAL_DATA', {data: result, shipments: result2});
                }
            });
        }
    });

    socket.on('REGISTER_DATA', function(data){
        var salt = Math.random().toString(36).substring(7);
        var pass = md5(data.password + salt);
        var query = connection.query('CALL addUser(?,?,?,?,?,?)', [data.nick, data.firstName, data.lastName, pass, salt, data.address], function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_NOT_SUCCESSFUL"});
                return;
            }
            else if(result[0][0].OK === 'OK'){
                io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_SUCCESSFUL"});
            }
            else{
                io.sockets.emit('REGISTER_RESPONSE', {res: "REGISTER_NOT_SUCCESSFUL"});
            }
        });
    });


    socket.on('ADD_OFFER_DATA', function(data){
        console.log(data);
            var query = connection.query('CALL addOffer(?,?,?,?,?,?)',
                [data.UserNick, data.ProductName, data.Category, data.Description, data.Price, data.ProductQuantity], function(err, result){
                if(err){
                    console.error(err);
                    io.sockets.emit('ADD_OFFER_RESPONSE', {res: "ADD_OFFER_NOT_SUCCESSFUL"});
                    return;
                }
                var offerID = result[0][0]['LAST_INSERT_ID()'];

                data.shipmentPossibility.map(key => {
                    connection.query('INSERT INTO offer_details(OfferID, ShipmentID) VALUES (?,?)', [offerID, key], function(err, result){
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


    socket.on('SEARCH', function(data){
        console.log(data);
        var queryQuery = "select OfferID, SellerID, ProductName, Category, Description, Price, ProductQuantity from offers where ProductName like '%" + data.ProductName + "%' and ";
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

    socket.on('ADD_ORDER', function(data){
        console.log(data);
        connection.query("CALL addOrder(?,?,?,?,?,?,?)",
            [data.UserNick, data.SellerID, data.OfferID, 0, data.ProductQuantity, data.ShipmentID, data.TotalPrice], function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('ADD_ORDER_RESPONSE', {res: "ADD_ORDER_NOT_SUCCESSFUL"});
                return;
            }
            else if(result[0][0].OK === 'OK'){
                connection.query('SELECT * FROM offers', function(err, result){
                    if(err){
                        console.error(err);
                        return;
                    }
                    else{
                        connection.query('SELECT * FROM shipments', function(err, result2){
                            if(err){
                                console.error(err);
                                return;
                            }
                            else{
                                io.sockets.emit('ADD_ORDER_RESPONSE', {data: result, res: "ADD_ORDER_SUCCESSFUL"});
                                // io.sockets.emit('INITIAL_DATA', {data: result, shipments: result2});
                            }
                        });
                    }
                });
            }
            else{
                io.sockets.emit('ADD_ORDER_RESPONSE', {res: "ADD_ORDER_NOT_SUCCESSFUL"});
            }
        });
    });

    socket.on('SIGN_IN', function(data){
        console.log(data);
        connection.query('SELECT PasswordSalt FROM users WHERE Nick=?',data.nick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                return;
            }
            else if(result.length !== 1){
                io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log(data.nick + " login not successfully");
            }
            else{
                connection.query('SELECT login(?,?);',[data.nick, md5(data.password + result[0].PasswordSalt)], function(err, result){
                    if(err){
                        console.error(err);
                        io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                        return;
                    }
                    else{
                        var loginResult = result[0][_.allKeys(result[0])[0]];
                        if(loginResult === 1){
                            io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_SUCCESSFULLY"});
                            console.log(data.nick + " login successfully");
                        }
                        else{
                            io.sockets.emit('SIGN_IN_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                            console.log(data.nick + " login not successfully");
                        }
                    }
                });

            }
        });
    });

    socket.on('CHECK_COOKIE_IDENTITY_DATA', function(data){
        console.log(data);
        connection.query('SELECT PasswordSalt FROM users WHERE Nick=?',data.nick, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                return;
            }
            else if(result.length !== 1){
                io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                console.log(data.nick + " login not successfully");
            }
            else{
                connection.query('select login(?,?);',[data.nick, md5(data.password + result[0].PasswordSalt)], function(err, result){
                    if(err){
                        console.error(err);
                        io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                        return;
                    }
                    else{
                        var loginResult = result[0][_.allKeys(result[0])[0]];
                        if(loginResult === 1){
                            io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_SUCCESSFULLY"});
                            console.log(data.nick + " login successfully");
                        }
                        else{
                            io.sockets.emit('CHECK_COOKIE_IDENTITY_DATA_RESPONSE', {res: "SIGN_IN_NOT_SUCCESSFULLY"});
                            console.log(data.nick + " login not successfully");
                        }
                    }
                });

            }
        });
    });

    socket.on('MY_ACCOUNT_DATA', function(data){
        console.log(data);
        connection.query('SELECT Nick, FirstName, LastName, Address FROM users WHERE Nick=?',data, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('MY_ACCOUNT_DATA_RESPONSE', {res: "MY_ACCOUNT_DATA_NOT_SUCCESSFUL"});
                return;
            }
            else{
                io.sockets.emit('MY_ACCOUNT_DATA_RESPONSE', {res: "MY_ACCOUNT_DATA_SUCCESSFUL", data: result});
            }

        });
    });

    socket.on('MY_ACCOUNT_OFFERS', function(data){
        console.log(data);
        // connection.query('SELECT ProductName, Category, Description, Price, ProductQuantity FROM offers INNER JOIN users ON offers.SellerID = users.UserID WHERE Nick=?',data, function(err, result){
            connection.query('CALL getUserOffers(?)',[data], function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('MY_ACCOUNT_OFFERS_RESPONSE', {res: "MY_ACCOUNT_OFFERS_NOT_SUCCESSFUL"});
                return;
            }
            else{
                console.log(result);
                io.sockets.emit('MY_ACCOUNT_OFFERS_RESPONSE', {res: "MY_ACCOUNT_OFFERS_SUCCESSFUL", data: result[0]});
            }

        });
    });

    socket.on('MY_ACCOUNT_ORDERS', function(data){
        console.log(data);
        // connection.query('select ProductName, TotalPrice, UnitPrice, Quantity, ShipmentName  from orders inner join order_details o  ' +
        //     'on orders.OrderId = o.OrderID inner join offers  f on f.OfferID = o.OfferID inner join shipments s on s.ShipmentID = o.ShipmentID ' +
        //     'inner join users on orders.BuyerID = users.UserID where Nick =?',data, function(err, result){
            connection.query('CALL getUserOrders(?)',[data], function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('MY_ACCOUNT_ORDERS_RESPONSE', {res: "MY_ACCOUNT_ORDERS_NOT_SUCCESSFUL"});
                return;
            }
            else{
                console.log(result);
                io.sockets.emit('MY_ACCOUNT_ORDERS_RESPONSE', {res: "MY_ACCOUNT_ORDERS_SUCCESSFUL", data: result[0]});
            }

        });
    });

    socket.on('GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES', function(data){
        connection.query('SELECT ShipmentID FROM offer_details WHERE OfferID=' + data, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES_RESPONSE', {res: "GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES_SUCCESSFUL"});
                return;
            }
            else{
                io.sockets.emit('GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES_RESPONSE', {res: "GET_SINGLE_OFFER_SHIPMENT_POSSIBILITIES_SUCCESSFUL",
                    data: result
                });
            }
        });
    });

    socket.on('GET_SINGLE_OFFER_COMMENTS', function(data){
        connection.query('select Content, Date, Nick from comments c inner join offers o on o.OfferID = c.OfferID inner join users u ' +
            'on u.UserId = c.UserID where o.OfferID = ' + data, function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('GET_SINGLE_OFFER_COMMENTS_RESPONSE', {res: "GET_SINGLE_OFFER_COMMENTS_NOT_SUCCESSFUL"});
                return;
            }
            else{
                io.sockets.emit('GET_SINGLE_OFFER_COMMENTS_RESPONSE', {res: "GET_SINGLE_OFFER_COMMENTS_SUCCESSFUL",
                    data: result
                });
            }
        });
    });

    socket.on('SEND_COMMENT', function(data){
        connection.query('call addComment(?,?,?,?,?)',[data.UserNick, data.OfferID, 0, 0, data.Content], function(err, result){
            if(err){
                console.error(err);
                io.sockets.emit('SEND_COMMENT_RESPONSE', {res: "SEND_COMMENT_NOT_SUCCESSFUL"});
                return;
            }
            else{
                connection.query('select Content, Date, Nick from comments c inner join offers o on o.OfferID = c.OfferID inner join users u ' +
                    'on u.UserId = c.UserID where o.OfferID = ' + data.OfferID, function(err, resu){
                    if(err){
                        console.error(err);
                        io.sockets.emit('SEND_COMMENT_RESPONSE', {res: "SEND_COMMENT_NOT_SUCCESSFUL"});
                        return;
                    }
                    else{
                        io.sockets.emit('SEND_COMMENT_RESPONSE', {res: "SEND_COMMENT_SUCCESSFUL",
                            data: resu
                        });
                    }
                });
            }
        });
    });


    socket.on('HANDLE_SHOPPING_BASKET', function(data){
        console.log(data);
        connection.query("CALL addOrder(?,?,?,?,?,?,?)",
            [data.UserNick, data.SellerID, data.OfferID, 0, data.ProductQuantity, data.ShipmentID, data.TotalPrice], function(err, result){
                if(err){
                    console.error(err);
                    io.sockets.emit('ADD_ORDER_RESPONSE', {res: "ADD_ORDER_NOT_SUCCESSFUL"});
                    return;
                }
                else if(result[0][0].OK === 'OK'){
                    connection.query('SELECT * FROM offers', function(err, result){
                        if(err){
                            console.error(err);
                            return;
                        }
                        else{
                            connection.query('SELECT * FROM shipments', function(err, result2){
                                if(err){
                                    console.error(err);
                                    return;
                                }
                                else{
                                    io.sockets.emit('ADD_ORDER_RESPONSE', {data: result, res: "ADD_ORDER_SUCCESSFUL"});
                                    // io.sockets.emit('INITIAL_DATA', {data: result, shipments: result2});
                                }
                            });
                        }
                    });
                }
                else{
                    io.sockets.emit('ADD_ORDER_RESPONSE', {res: "ADD_ORDER_NOT_SUCCESSFUL"});
                }
            });
    });

});