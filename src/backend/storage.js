const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../../data/medicamentos.json");

function loadMedicamentos() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ medicamentos: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function saveMedicamentos(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = { loadMedicamentos, saveMedicamentos };
