const socketio = io();
const form = document.getElementById("form");
const input = document.getElementById("msg");
const chats = document.getElementById("chats");

const nameform = document.getElementById("nameform");
const name = document.getElementById("name");

let username='';
nameform.addEventListener('submit', function(event){
  if(name.value!==''){
    username = name.value;
    nameform.style.display ="none";
    form.style.display ="block";

    socketio.emit('signin');

    const msg = {msg: username + ' さんが参加しました。', name: 'システム'};
    socketio.emit('message', msg);
  }

  event.preventDefault();
})

form.addEventListener('submit', function(event){
  if(input.value!==''){
    const msg = {msg: input.value, name: username};
    socketio.emit('message', msg);
    input.value='';
  }
  event.preventDefault();
})

socketio.on('message',function(msg){
  if(username===''){
    // まだ参加していなかったら、チャットを表示しない
    return;
  }
  displayMessage(msg);
});

// 参加時に過去のメッセージを受け取る
socketio.on('signin',function(msgs){
  for(let i=0;i<msgs.length;i++){
    const msg = msgs[i];
    displayMessage(msg);
  }
});

function displayMessage(msg){
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  const dd2 = document.createElement("dd");
  dt.append(msg.name);
  chats.append(dt);
  dd.append(msg.msg);
  chats.append(dd);
  dd2.append(formatDate(new Date(msg.date), 'yyyy/MM/dd HH:mm:ss'));
  chats.append(dd2);
}

function formatDate (date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
  return format;
};