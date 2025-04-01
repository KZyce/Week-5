const rows = 3, cols = 3;
const container = document.getElementById("puzzle-container");
let positions = [];

function createPuzzle() {
    positions = [];
    container.innerHTML = "";

    for (let i = 0; i < rows * cols; i++) {
        positions.push(i);
    }
    positions.sort(() => Math.random() - 0.5); 

    for (let i = 0; i < rows * cols; i++) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = "url('fish.jpg')"; 
        piece.style.backgroundPosition = `-${(positions[i] % cols) * 100}px -${Math.floor(positions[i] / cols) * 100}px`;
        piece.setAttribute("draggable", "true");
        piece.dataset.index = positions[i];

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);

        container.appendChild(piece);
    }
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let draggedIndex = event.dataTransfer.getData("text/plain");
    let targetIndex = event.target.dataset.index;

    let draggedPiece = document.querySelector(`[data-index='${draggedIndex}']`);
    let targetPiece = event.target;

    let tempPos = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempPos;

    let tempData = draggedPiece.dataset.index;
    draggedPiece.dataset.index = targetPiece.dataset.index;
    targetPiece.dataset.index = tempData;

    checkWin();
}

function checkWin() {
    let pieces = document.querySelectorAll(".piece");
    let isSolved = Array.from(pieces).every((piece, i) => piece.dataset.index == i);
    document.getElementById("message").textContent = isSolved ? "🎉 Puzzle Solved!" : "";
}

createPuzzle();