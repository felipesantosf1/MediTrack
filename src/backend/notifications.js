const notifier = require("node-notifier");
const path = require("path");
const { isTimeNow, is30minBefore } = require("../utils/time");

function startNotifications(getMedicamentos) {
    const avisosDisparados = {};

    setInterval(() => {
        const agora = new Date();
        const chaveAgora = `${agora.toDateString()}-${agora.getHours()}:${agora.getMinutes()}`;

        getMedicamentos().forEach(med => {
            if (!med.time || med.time === "--:--") return;

            const keyExato = `${med.id}_exato_${chaveAgora}`;
            const keyAntes = `${med.id}_30min_${chaveAgora}`;

            // Notificação na hora exata
            if (isTimeNow(med.time) && !avisosDisparados[keyExato]) {
                showNotification(med.name, "agora");
                avisosDisparados[keyExato] = true;
            }

            // Notificação 30 minutos antes
            if (is30minBefore(med.time) && !avisosDisparados[keyAntes]) {
                showNotification(med.name, "30min");
                avisosDisparados[keyAntes] = true;
            }
        });
    }, 10 * 1000); /* DEPOIS ALTERAR PARA 60 * 1000 */
}

function showNotification(medName, tipo = "agora") {
    let message;

    if (tipo === "agora") {
        message = `Está na hora de tomar: ${medName}`;
    } else if (tipo === "30min") {
        message = `Faltam 30 minutos para tomar: ${medName}`;
    }

    notifier.notify({
        appID: "MedicAlert",
        title: "Hora do Remédio",
        message,
        icon: path.join(__dirname, "transparent.png"/* "../../img/pilula.png" */),
        wait: false
    });
}

module.exports = { startNotifications };
