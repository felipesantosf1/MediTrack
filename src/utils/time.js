function isTimeNow(medTime) {
    const [hora, minuto] = medTime.split(":").map(Number);
    const now = new Date();
    return now.getHours() === hora && now.getMinutes() === minuto;
}

function is30minBefore(medTime) {
    const [hora, minuto] = medTime.split(":").map(Number);
    const target = new Date();
    target.setHours(hora, minuto, 0, 0);

    const thirtyMinBefore = new Date(target.getTime() - 30 * 60 * 1000);
    const now = new Date();

    return now.getHours() === thirtyMinBefore.getHours() &&
    now.getMinutes() === thirtyMinBefore.getMinutes();
}

module.exports = { isTimeNow, is30minBefore };
