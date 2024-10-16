const { app, BrowserWindow, crashReporter } = require('electron/main')
const parseArgs = require('electron-args');

const cli = parseArgs(`
webgpu-electron

Usage
  $ webgpu-electron [options] [sample-name]

Options
  --help     show help
  --fullscreen start fullscreen
  --devtools   open devtools
`, {
	alias: {
		h: 'help',
		f: 'fullscreen',
		d: 'devtools',
	},
	default: {
		fullscreen: false,
		devtools: false,
	}
});

const sample_name = cli.input[0] ? cli.input[0] : 'triangle';

crashReporter.start({uploadToServer: false})
app.commandLine.appendSwitch("enable-features", "Vulkan")
app.commandLine.appendSwitch("enable-unsafe-webgpu")
app.commandLine.appendSwitch("enable-webgpu-developer-features")
const createWindow = () => {
  const win = new BrowserWindow({
      fullscreen: cli.flags['fullscreen'],
  });
  if (cli.flags['devtools']) {
    win.webContents.openDevTools()
  }
  win.loadFile(sample_name + '/index.html')
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
