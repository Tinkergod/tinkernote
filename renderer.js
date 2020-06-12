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
  let user_input = document.getElementById("text_box").value;
  if (key_event.keyCode == 13) {
    ipcRenderer.send('execute-user-command', user_input);
  }
}

document.addEventListener('keyup', executeCommandInput);
