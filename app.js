const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

io.on('connection',function(socket){
    socket.on('message',function(msg){
        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});
