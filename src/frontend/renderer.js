import { renderMedic } from "./ui.js";
import { openNewModal, openEditModal } from "./modal.js";

const addBtn = document.querySelector(".add-btn");

let appData = { medicamentos: [] };

function salvar() {
    window.api.saveMeds(appData);
}

window.addEventListener("DOMContentLoaded", async () => {
    appData = await window.api.loadMeds();
    appData.medicamentos.forEach(med =>
        renderMedic(med, appData, salvar, openEditModal)
    );
});

addBtn.addEventListener("click", () => openNewModal(appData, salvar));
