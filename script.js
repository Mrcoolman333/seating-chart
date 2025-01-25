function generateGrid() {
  const grid = document.getElementById('grid');
  const rows = document.getElementById('rows').value;
  const cols = document.getElementById('cols').value;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.innerHTML = '';

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('contenteditable', 'true');
    grid.appendChild(cell);
  }

  document.getElementById('edit').style.display = 'block';
  document.getElementById('random').style.display = 'block';
  editIsOn = false; // ensures the edit button always toggles on
}

function randomizeNames() {
  const grid = document.getElementById('grid');
  const cells = Array.from(grid.children);
  const validCells = cells.filter(cell => !cell.classList.contains('wasDeleted'));
  const texts = validCells.map(cell => cell.textContent.trim());
  const shuffledTexts = texts.sort(() => Math.random() - 0.5);
  validCells.forEach((cell, index) => {
    cell.textContent = shuffledTexts[index] || '';
  });
}

var editIsOn = false;

function editModeToggle() {
  editIsOn = !editIsOn;

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    if (editIsOn && !cell.classList.contains('wasDeleted')) {
      cell.classList.add('delete-mode');
      cell.addEventListener('click', deleteCell);
    } else {
      cell.classList.remove('delete-mode');
      cell.removeEventListener('click', deleteCell);
    }
  });
}

function deleteCell(event) {
  if (editIsOn) {
    const cell = event.target;
    cell.textContent = '';
    cell.style.border = 'none';
    cell.classList.remove('delete-mode');
    cell.style.backgroundColor = 'transparent';
    cell.removeEventListener('click', deleteCell);
    cell.setAttribute('contenteditable', 'false');
    cell.classList.add('wasDeleted');
  }
}
