const medicContainer = document.querySelector(".medic-item");
const addBtn = document.querySelector(".add-btn");

const addModal = document.getElementById("addModal");
const medicNameInput = document.getElementById("medicName");
const medicTimeInput = document.getElementById("medicTime");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

let usedIds = [];

function gerarId() {
    for (let i = 1; i <= 1000; i++) {
        if (!usedIds.includes(i)) {
            usedIds.push(i);
            return i;
        }
    }
}

function removerId(id) {
    const index = usedIds.indexOf(id);
    if (index !== -1) usedIds.splice(index, 1);
}

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") addModal.style.display = "none";
});

addModal.addEventListener("click", (e) => {
    if (e.target === addModal) addModal.style.display = "none";
});

// Abrir modal
addBtn.addEventListener("click", () => {
    medicNameInput.value = "";
    medicTimeInput.value = "";
    addModal.style.display = "flex";
    medicNameInput.focus(); // foca automaticamente
});

// Cancelar modal
cancelBtn.addEventListener("click", () => {
    addModal.style.display = "none";
});

saveBtn.addEventListener("click", () => {
    const name = medicNameInput.value.trim();
    const time = medicTimeInput.value || "--:--";

    // Validar nome
    if (!name) {
        // Apenas foca o input e mostra borda vermelha
        medicNameInput.style.border = "2px solid red";
        medicNameInput.focus();
        return; // impede de adicionar
    } else {
        medicNameInput.style.border = ""; // remove borda vermelha se preenchido
    }

    const newId = gerarId();

    const entry = document.createElement("div");
    entry.classList.add("medic-entry");

    entry.innerHTML = `
        <input type="checkbox" id="medic-${newId}" class="medic-check">
        <label for="medic-${newId}" class="medic-label">
            <div class="top">
                <span class="medic-name">${name}</span>
                <button class="delete-btn">
                    <img src="lixo.png" alt="Excluir">
                </button>
            </div>
            <div class="down">
                <span class="timer">${time}</span>
            </div>
        </label>
    `;

    const deleteBtn = entry.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        entry.remove();
        removerId(newId);
    });

    medicContainer.appendChild(entry);
    addModal.style.display = "none";
});


