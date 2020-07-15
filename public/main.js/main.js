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
