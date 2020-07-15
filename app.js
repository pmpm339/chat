const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const PORT = 3000;

app.use(express.static('public'));

let messages = []; // 過去のメッセージを保存しておく配列

// プログラム終了時に過去メッセージをファイルに保存
process.on('exit', function (code) {
    // .data ディレクトリが存在しなければ、ディレクトリを作成
    if (!fs.existsSync('.data')) {
        fs.mkdirSync('.data');
    }
    // 過去メッセージをファイルに保存
    fs.writeFileSync('.data/data.json', JSON.stringify(messages));
    console.log('Exiting');
});
process.on("SIGINT", function () {
    process.exit(0);
});
process.on("SIGTERM", function () {
    process.exit(0);
});

// 過去メッセージをファイルから読み込み
// ファイルが無くてエラーになる場合もあるので try...catch でエラー回避
try {
    // messages変数が空の時だけ、ファイルから過去ログを読み込む
    if(messages.length===0){
        messages = JSON.parse(fs.readFileSync('.data/data.json'));
    }
}
catch {

}

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
