'use strict';

const { addUser, getUser, deleteUser } = require('./cache');

module.exports = (server, models) => {
    const io = require('socket.io')(server);
    io.on('connection', (socket) => {
        socket.on('join', (params) => {
            try {
                params['id'] = socket.id;
                const { error } = addUser(params);
                if (error) {
                    io.emit('errormessage', {
                        text: error
                    })
                } else {
                    socket.broadcast.to(params.room).emit('message', {
                        text: `${params.name} has joined the Chat`
                    })
                    socket.join(params.room);
                }
            } catch (error) {
                callback(error);
            }
        });

        socket.on('sendMessage', (params) => {
            try {
                const user = getUser(socket.id);
                if (user.length > 0) {
                    io.to(user[0].room).emit('message', {
                        user: user[0].name,
                        text: params
                    });
                } else {
                    io.emit('errormessage', {
                        text: "User Doesnt exist"
                    })
                }
            } catch (error) {
                callback(error);
            }
        });

        socket.on('disconnect', () => {
            const user = deleteUser(socket.id);
            if (user){
                socket.broadcast.to(user.room).emit('message', {
                    text: `${user.name} has left the conversation`
                });
                socket.leave(user.room)
            }
        });
    });
}