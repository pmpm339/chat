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
})

form.addEventListener('submit', function(event){
  const msg = JSON.stringify({msg: input.value, name: username})
  socketio.emit('message', msg);
  input.value='';
  event.preventDefault();
})
socketio.on('message',function(msg){
  const obj = JSON.parse(msg);

  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.append(obj.name);
  chats.append(dt);
  dd.append(obj.msg);
  chats.append(dd);
});
