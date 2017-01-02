/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up
// import io from 'socket.io-client';
// var socket = io.connect('http://localhost:3200/');

export default function (state = null, action) {
    switch (action.type) {
        case 'USER_SELECTED':
            // socket.on('new message', function(data){
            //     console.log(data.msg);
            //     console.log(data.res);
            // });
            // socket.emit('new user', {asd: "ssds"});
            console.log("EMIT !!! EMIT !!!");
            return action.payload;
            break;
    }
    return state;
}
