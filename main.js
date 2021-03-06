// Modules to control application life and create native browser window
const {app, BrowserWindow, remote} = require('electron')
const path = require('path')
const process = require('process');
const {ipcMain} = require('electron');
var exec = require('child_process').exec, child;
require('v8-compile-cache')

function createWindow () {
  // Create the browser window.
  const process = require('process');
  const mainWindow = new BrowserWindow({
    useContentSize:true,
    width:700,
    height:350,
    minWidth: 250,
    minHeight:300,
    resizable: false,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
global.sharedObject = {prop1:process.argv}

ipcMain.on('execute-user-command', (event, arg) => {
  console.log(arg.slice(0, arg.length - 1))
  app.exit(0);
})

ipcMain.on('quit', (event) => {
  app.exit(0);
})


