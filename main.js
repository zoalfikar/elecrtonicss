const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require("fs");
const { ipcMain } = require('electron');

var homaPagePath = '';
let win;
fs.readFile("electronics.json", (error, data) => {
    // if the reading process failed,
    // throwing the error
    if (error) {
        // logging the error
        console.error(error);

        throw err;
    }

    // parsing the JSON object
    // to convert it to a JavaScript object
    const info = JSON.parse(data);

    // printing the JavaScript object
    // retrieved from the JSON file
    if (info.Initialized == "1") {
        homaPagePath = 'index.html';
    } else {
        homaPagePath = 'Initialization.html';
    }

    function createWindow() {
        win = new BrowserWindow({
            width: 1200,
            height: 600,

            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js')
            }
        })
        win.webContents.openDevTools()
        win.loadFile(homaPagePath)

    }

    app.whenReady().then(() => {
        createWindow()

        ipcMain.on('change-web-content', (event, data) => {
            win.loadFile(data)
        });
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })


    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

});