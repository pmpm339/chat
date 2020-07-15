const socketio = io();
const form = document.getElementById("form");
const input = document.getElementById("msg");
const chats = document.getElementById("chats");

const nameform = document.getElementById("nameform");
const name = document.getElementById("name");

let username='';
nameform.addEventListener('submit', function(event){
  username = name.value;
  event.preventDefault();
  nameform.style.display ="none";
  form.style.display ="block";

  const msg = {msg: username + ' さんが参加しました。', name: 'システム'};
  socketio.emit('message', msg);

})

form.addEventListener('submit', function(event){
  const msg = {msg: input.value, name: username};
  socketio.emit('message', msg);
  input.value='';
  event.preventDefault();
})

socketio.on('message',function(msg){
  if(username===''){
    // まだ参加していなかったら、チャットを表示しない
    return;
  }
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.append(msg.name);
  chats.append(dt);
  dd.append(msg.msg);
  chats.append(dd);
});
