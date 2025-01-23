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
    }

    function randomizeNames() {
      const nameList = document.getElementById('name-list').value.split('\n').filter(name => name.trim() !== '');
      const grid = document.getElementById('grid');
      const cells = Array.from(grid.children);
      if (nameList.length > cells.length) {
        alert('Create more seats to fit the names!');
        return;
      }

      const shuffledNames = nameList.sort(() => Math.random() - 0.5);
      cells.forEach((cell, index) => {
        cell.textContent = shuffledNames[index] || '';
      });
    }