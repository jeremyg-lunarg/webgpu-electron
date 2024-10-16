const { app, BrowserWindow, crashReporter } = require('electron/main')
const parseArgs = require('electron-args');

const cli = parseArgs(`
	sample-viewer

	Usage
	  $ sample-viewer [path]

	Options
	  --help     show help
	  --fullscreen start fullscreen
          --devtools   open devtools
	  --auto     slide show [Default: false]

	Examples
	  $ sample-viewer . --auto
	  $ sample-viewer ~/Pictures/
`, {
	alias: {
		h: 'help',
		f: 'fullscreen',
		d: 'devtools',
		a: 'app',
	},
	default: {
		fullscreen: false,
		devtools: false,
		app: 'triangle',
	}
});

console.log(cli.flags);
console.log(cli.input[0]);


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
  win.loadFile(cli.flags['app'] + '.html')
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
