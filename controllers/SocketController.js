'use strict';
var socket = require('socket.io');
/*The class is to handle all socket events
=======
/*
*/

class Socket {

    constructor(socket) {
        this.io = socket;
    }

    socketEvents() {

        this.io.on('connection', (socket) => {

            //this.socketConfig();

            /**
getting  the user's Chat list
            */

            socket.on('directory-list', (data) => {
                let chatListResponse = {};
                if (data.userId == '') {
                    chatListResponse.error = true;
                    chatListResponse.message = `User does not exits.`;
                    console.log("User does not exit");
                    this.io.emit('directory-list-response', chatListResponse);

                } else {

                    user.getUserSortedList().then(result => {
                        var data = JSON.stringify(result);

                        if (result == -2) {
                            console.log("No resulr:Error");
                        } else {
                            this.io.to(socket.id).emit('directory-list-response', data);
                        }
                    });

                }

            });

            /**
            * Logout the user
            * This function logs out the user
            *
            */

            socket.on('logout', (data) => {
                var userObject = new userModel();
                console.log("Log out by");
                userObject.updateOnlineStatusForLogout(data.userId).then(result => {
                    console.log(socket.id);
                    if (result) {
                        console.log("Log out by #12:" + socket.id);
                        this.io.to(socket.id).emit('logout-response', {
                            error: false
                        });
                    } else {

                        console.log("Not able to redirect...." + result);
                    }

                });
            });


        });

    }


    /*The method expects a key word and data to be passed
    * the key word can be announcement and messages
    * @param and response
    *testing the socket emit
    */
    Broadcast(keyword, data) {
        this.io.sockets.emit(keyword, data)
    }


/*
socketConfig() {
        this.io.use(function (socket, next) {
            console.log("Checking the socket her" + this.io);
            var username = socket.request._query['userId'];
            console.log(username);
            let userSocketId = socket.id;
            if (typeof username !== "undefined") {
                console.log("Not undefined:");
                console.log("Server being called here by the client socket:" + username + " with socket id:" + socket.id);
                const data = {
                    username: username,
                    socketId: userSocketId
                }
                var userObject = new userModel();
                userObject.AssignUserSocketId(username, userSocketId).then(response => {
                    next();
                });
            } else {
                username = "no users";
                userSocketId = -1;
                console.log("Not setting of socketid:");
            }
        });
        this.socketEvents();
    }
    */
}


module.exports = Socket;