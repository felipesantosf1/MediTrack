const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function Carregar_Janela() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 500,
        autoHideMenuBar: true,
        // opcional: não aparece na barra de tarefas
        skipTaskbar: false,
        webPreferences: {
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

// Cria o ícone na bandeja
function Criar_Tray() {
    tray = new Tray(path.join(__dirname, 'pilula.png')); // coloque o caminho da sua imagem aqui

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
