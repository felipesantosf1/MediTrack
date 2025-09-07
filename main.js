const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let tray;

const dataPath = path.join(__dirname, "data", "medicamentos.json");

function loadMedicamentos() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({
            medicamentos: []
        }, null, 2));
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    return data;
}

function saveMedicamentos(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}


function saveMedicamentos(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// ----------------- IPC -----------------
ipcMain.handle("load-meds", () => {
    return loadMedicamentos();
});

ipcMain.on("save-meds", (event, data) => {
    saveMedicamentos(data);
});

function Carregar_Janela() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 500,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "img", "pilula.png"),
        skipTaskbar: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile("interface/index.html");

    // Evita fechar a janela, só esconde
    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });
}

// ----------------- TRAY -----------------
function Criar_Tray() {
    tray = new Tray(path.join(__dirname, 'img/pilula.png')); // coloque o caminho da sua imagem aqui

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Abrir MediTrack',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Sair',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('MediTrack');
    tray.setContextMenu(contextMenu);

    // Clique no ícone mostra/oculta a janela
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
}

app.whenReady().then(() => {
    Carregar_Janela();
    Criar_Tray();
});

// Garante que o app não feche no Windows/macOS quando todas as janelas forem fechadas
app.on('window-all-closed', (e) => {
    e.preventDefault();
});
