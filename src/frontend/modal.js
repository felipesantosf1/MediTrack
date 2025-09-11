import { renderMedic } from "./ui.js";

const addModal = document.getElementById("addModal");
const medicNameInput = document.getElementById("medicName");
const medicTimeInput = document.getElementById("medicTime");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

export function openNewModal(appData, salvar) {
    medicNameInput.value = "";
    medicTimeInput.value = "";
    addModal.style.display = "flex";
    medicNameInput.focus();

    saveBtn.onclick = () => {
        const name = medicNameInput.value.trim();
        const time = medicTimeInput.value || "--:--";
        if (!name) {
            medicNameInput.style.border = "2px solid red";
            return;
        }

        const newMed = { id: Date.now(), name, time, taken: false };
        appData.medicamentos.push(newMed);
        renderMedic(newMed, appData, salvar, openEditModal);
        salvar();
        addModal.style.display = "none";
    };
}

export function openEditModal(med, label, salvar) {
    medicNameInput.value = med.name;
    medicTimeInput.value = med.time !== "--:--" ? med.time : "";
    addModal.style.display = "flex";
    medicNameInput.focus();

    saveBtn.onclick = () => {
        const newName = medicNameInput.value.trim();
        const newTime = medicTimeInput.value || "--:--";
        if (!newName) {
            medicNameInput.style.border = "2px solid red";
            return;
        }
        med.name = newName;
        med.time = newTime;
        label.querySelector(".medic-name").textContent = newName;
        label.querySelector(".timer").textContent = newTime;
        salvar();
        addModal.style.display = "none";
    };
}

cancelBtn.addEventListener("click", () => addModal.style.display = "none");
addModal.addEventListener("click", (e) => {
    if (e.target === addModal) addModal.style.display = "none";
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") addModal.style.display = "none";
});
