const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('electronics', {
    startInitialization: () => require('./initDatabase.js')
})