const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    loadMeds: () => ipcRenderer.invoke("load-meds"),
    saveMeds: (data) => ipcRenderer.send("save-meds", data)
});
