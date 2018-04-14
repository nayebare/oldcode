/*Group Rw1 fse emergency network*/
/*This the main engine of the esn project**/
/*created at 1:19 AM CAT 2/16/2018**/
/****happy coding guys **********/

/*
                        Definition of required node modules/resources/variables
                        1.Express:
                        2.routes:
                        3.bodyparser:
                        4.Session:
                        5.session:
                        6.socket:

*/

var express = require('express');
var routes = require('./routes.js');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var socket = require('socket.io');

/*

                        Defining session variables
                        session variable:session


*/
app.use(session(
        {
                cookieName: 'session',
                secret: 'fsegroup',
                httpOnly: true,
                secure: true,
                ephemeral: true
        }
)
);

/*
    Setting ejs as the base template

*/
app.set('view engine', 'ejs');
/*
  Setting the routes

*/
app.use('/', routes);
/*
Setting the static folder
*/

app.use(express.static('public'));
/*
Defining the server port and socket
*/
var PORT = process.env.PORT || 8000;
const server = app.listen(PORT, function () { });
var io = socket(server);

module.exports.serverSocket = socket(server);//export the io to be used by other functions



