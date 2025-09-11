export function addDragAndDropListeners(entry, appData, salvar) {
    let dragSrcEl = null;

    entry.addEventListener("dragstart", function (e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = "move";
    });

    entry.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });

    entry.addEventListener("drop", function (e) {
        e.stopPropagation();
        if (dragSrcEl !== this) {
            const allEntries = Array.from(entry.parentNode.children);
            const srcIndex = allEntries.indexOf(dragSrcEl);
            const targetIndex = allEntries.indexOf(this);

            if (srcIndex < targetIndex) {
                entry.parentNode.insertBefore(dragSrcEl, this.nextSibling);
            } else {
                entry.parentNode.insertBefore(dragSrcEl, this);
            }

            const medList = appData.medicamentos;
            const [movedMed] = medList.splice(srcIndex, 1);
            medList.splice(targetIndex, 0, movedMed);

            salvar();
        }
        return false;
    });
}
