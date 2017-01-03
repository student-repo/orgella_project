import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
require('../../scss/style.scss');
// import io from 'socket.io-client';
// var socket = io.connect('http://localhost:3200/');

const App = () => (
    <div>
        <h2>User List</h2>
        <UserList foo = {socket}/>
        <hr />
        <h2>User Details</h2>
        <UserDetails foo = {socket}/>
    </div>
);

export default App;


{/*<h2>User List</h2>*/}
{/*<UserList foo = {socket}/>*/}
    {/*<hr />*/}
    {/*<h2>User Details</h2>*/}
{/*<UserDetails foo = {socket}/>*/}