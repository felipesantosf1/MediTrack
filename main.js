const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const { loadMedicamentos, saveMedicamentos } = require("./src/backend/storage");
const { startNotifications } = require("./src/backend/notifications");

let mainWindow;
let tray;
let appData = { medicamentos: [] };

// ----------------- IPC -----------------
ipcMain.handle("load-meds", () => appData);

ipcMain.on("save-meds", (event, data) => {
    appData = data;
    saveMedicamentos(appData);
});

// ----------------- JANELA -----------------
function createWindow() {
    appData = loadMedicamentos();

    mainWindow = new BrowserWindow({
        width: 350,
        height: 500,
        resizable: false,
        maximizable: false,
        minimizable: true,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "img/pilula.ico"),
        skipTaskbar: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile("interface/index.html");

    mainWindow.on("close", (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    startNotifications(() => appData.medicamentos);
}

// ----------------- TRAY -----------------
function createTray() {
    tray = new Tray(path.join(__dirname, "img/pilula.ico"));

    const contextMenu = Menu.buildFromTemplate([
        { label: "Abrir MedicAlert", click: () => mainWindow.show() },
        { label: "Sair", click: () => { app.isQuiting = true; app.quit(); } }
    ]);

    tray.setToolTip("MedicAlert");
    tray.setContextMenu(contextMenu);

    tray.on("click", () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();
    createTray();
});

app.on("window-all-closed", (e) => e.preventDefault());
