const { ipcRenderer } = require("electron"); 

const medicContainer = document.querySelector(".medic-container");
const addBtn = document.querySelector(".add-btn");

const addModal = document.getElementById("addModal");
const medicNameInput = document.getElementById("medicName");
const medicTimeInput = document.getElementById("medicTime");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let appData = {
    medicamentos: []
};

// ---------- FUNÇÕES ----------
function salvar() {
    ipcRenderer.send("save-meds", appData);
}

function addMedicToUI(med) {
    const entry = document.createElement("div");
    entry.classList.add("medic-entry");

    entry.innerHTML = `
        <input type="checkbox" id="medic-${med.id}" class="medic-check" ${med.taken ? "checked" : ""}>
        <label for="medic-${med.id}" class="medic-label ${med.taken ? "checked" : ""}">
            <div class="top">
                <span class="medic-name">${med.name}</span>
                <button class="delete-btn">
                    <img src="../img/lixo.png" alt="Excluir">
                </button>
            </div>
            <div class="down">
                <span class="timer">${med.time}</span>
            </div>
        </label>
    `;

    const deleteBtn = entry.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        entry.remove();
        appData.medicamentos = appData.medicamentos.filter(m => m.id !== med.id);
        salvar();
    });

    const check = entry.querySelector(".medic-check");
    const label = entry.querySelector(".medic-label");

    check.addEventListener("change", () => {
        med.taken = check.checked;
        label.classList.toggle("checked", check.checked);
        salvar();
    });

    medicContainer.appendChild(entry);
}

// ---------- EVENTOS ----------
window.addEventListener("DOMContentLoaded", async () => {
    appData = await ipcRenderer.invoke("load-meds");

    // Reseta todos os medicamentos ao iniciar o app
    appData.medicamentos.forEach(m => m.taken = false);
    salvar();

    appData.medicamentos.forEach(addMedicToUI);
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") addModal.style.display = "none";
});

addModal.addEventListener("click", (e) => {
    if (e.target === addModal) addModal.style.display = "none";
});

addBtn.addEventListener("click", () => {
    medicNameInput.value = "";
    medicTimeInput.value = "";
    addModal.style.display = "flex";
    medicNameInput.focus();
});

cancelBtn.addEventListener("click", () => {
    addModal.style.display = "none";
});

saveBtn.addEventListener("click", () => {
    const name = medicNameInput.value.trim();
    const time = medicTimeInput.value || "--:--";

    if (!name) {
        medicNameInput.style.border = "2px solid red";
        medicNameInput.focus();
        return;
    }
    medicNameInput.style.border = "";

    const newMed = {
        id: Date.now(),
        name,
        time,
        taken: false
    };

    appData.medicamentos.push(newMed);
    addMedicToUI(newMed);
    salvar();
    
    addModal.style.display = "none";
});
