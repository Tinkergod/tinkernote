// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

window.addEventListener('DOMContentLoaded', () => {
  var remote = require('electron').remote, args = remote.getGlobal('sharedObject').prop1;
  if (args.length >= 1) {
    document.getElementById("text_box").setAttribute("placeholder", args[1]);
  } else {
    document.getElementById("message_query").innerHTML="Enter text"
  }
})
