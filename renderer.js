// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//
//
const {ipcRenderer} = require('electron');

let executeCommandInput = function(key_event) {
  let user_input = document.querySelector("#text_box").value;
  if (key_event.keyCode == 13 && !key_event.shiftKey) {
    ipcRenderer.send('execute-user-command', user_input);
  }
}

let userQuitApp = function(key_event) {
  console.log(key_event.code)
  if (key_event.code == "Escape") {
    ipcRenderer.send('quit');
  }
}

let clearContent = function(key_event) {
  if (key_event.ctrlKey && key_event.keyCode === 67 ) {
    document.querySelector('#text_box').value="";
  }
}

document.addEventListener('keyup', executeCommandInput);
document.addEventListener('keyup', userQuitApp);
document.addEventListener('keyup', clearContent);
