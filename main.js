const { app, BrowserWindow } = require('electron/main')

app.commandLine.appendSwitch("enable-features", "Vulkan")
app.commandLine.appendSwitch("enable-unsafe-webgpu")
app.commandLine.appendSwitch("enable-webgpu-developer-features")
const createWindow = () => {
  const win = new BrowserWindow({
    height: 560,
    width: 540,
  });
  win.webContents.openDevTools()
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

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
