const { app, BrowserWindow, crashReporter } = require('electron/main')
crashReporter.start({uploadToServer: false})
app.commandLine.appendSwitch("enable-features", "Vulkan")
app.commandLine.appendSwitch("enable-unsafe-webgpu")
app.commandLine.appendSwitch("enable-webgpu-developer-features")
const createWindow = () => {
  const win = new BrowserWindow({
      fullscreen: true,
  });
  win.webContents.openDevTools()
  win.loadFile('triangle.html')
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
