import { app, BrowserWindow, ipcMain } from 'electron'
import path from "path";
import { Logger } from '@171h/log'

const log = new Logger('electron:main.ts')
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "index.html"));
  }

  ipcMain.on('message', (event, arg) => {
    console.log(arg)
    log.log(arg)
  })

  setTimeout(() => {
    win.webContents.send('load', 'hello from electron')
  }, 3000);
}

app.whenReady().then(createWindow)