const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use(express.static('public'));

let messages = []; // 過去のメッセージを保存しておく配列

io.on('connection',function(socket){
    socket.on('signin',function(){
        // 参加時に過去のメッセージを返す
        const id = socket.id;
        io.to(id).emit('signin', messages);
    });

    socket.on('message',function(msg){
        msg.date = Date.now();
        messages.push(msg); // メッセージを配列に追加
        messages=messages.slice(-100); // 最新の100件だけ保存
        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});
