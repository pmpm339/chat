<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Obirin2020 chat</title>
    <script src="/socket.io/socket.io.js"></script>
    <link href="style.css" rel="stylesheet" type="text/css">
</head>
<body>
    <h1>チャット</h1>
    <ul id="chats"></ul>
    <form id="form">
      <input id="msg" autocomplete="off" /><button>送信</button>
    </form>
  <script>
    const socketio = io();
    const form = document.getElementById("form");
    const input = document.getElementById("msg");
    const chats = document.getElementById("chats");

    form.addEventListener('submit', function(event){
      socketio.emit('message', input.value);
      input.value='';
      event.preventDefault();
    })
    socketio.on('message',function(msg){
      const li = document.createElement("li");
      li.append(msg);
      chats.append(li);
    });
  </script>
</body>
</html>
