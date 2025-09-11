import { addDragAndDropListeners } from "./dragdrop.js";

const medicContainer = document.querySelector(".medic-container");

export function renderMedic(med, appData, salvar, openEditModal) {
    const entry = document.createElement("div");
    entry.classList.add("medic-entry");
    entry.draggable = true;

    entry.innerHTML = `
        <input type="checkbox" id="medic-${med.id}" class="medic-check" ${med.taken ? "checked" : ""}>
        <label for="medic-${med.id}" class="medic-label ${med.taken ? "checked" : ""}">
            <div class="top">
                <span class="medic-name">${med.name}</span>
                <div class="actions">
                    <button class="edit-btn"><img src="../interface/icons/edit.svg" alt="Editar" class="icon" /></button>
                    <button class="delete-btn"><img src="../interface/icons/trash.svg" alt="Deletar" class="icon" /></button>
                </div>
            </div>
            <div class="down"><span class="timer">${med.time}</span></div>
        </label>
    `;

    const deleteBtn = entry.querySelector(".delete-btn");
    const editBtn = entry.querySelector(".edit-btn");
    const check = entry.querySelector(".medic-check");
    const label = entry.querySelector(".medic-label");

    deleteBtn.addEventListener("click", () => {
        entry.remove();
        appData.medicamentos = appData.medicamentos.filter(m => m.id !== med.id);
        salvar();
    });

    editBtn.addEventListener("click", () => openEditModal(med, label, salvar));

    check.addEventListener("change", () => {
        med.taken = check.checked;
        label.classList.toggle("checked", check.checked);
        salvar();
    });

    medicContainer.appendChild(entry);
    addDragAndDropListeners(entry, appData, salvar);
}
