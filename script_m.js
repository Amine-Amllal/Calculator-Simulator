window.onload = function () {
  initializeMatrix('matrixA', 3);
  initializeMatrix('matrixB', 3);
};
document.addEventListener('keydown', function (e) {
  if (e.target.type === 'number') {
    const currentCell = e.target;
    const currentRow = currentCell.parentElement;
    const matrix = currentRow.parentElement;
    const rowIndex = Array.from(matrix.children).indexOf(currentRow);
    const cellIndex = Array.from(currentRow.children).indexOf(currentCell);
    switch (e.key) {
      case 'ArrowUp':
        if (rowIndex > 0) {
          matrix.children[rowIndex - 1].children[cellIndex].focus();
        }
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (rowIndex < matrix.children.length - 1) {
          matrix.children[rowIndex + 1].children[cellIndex].focus();
        }
        e.preventDefault();
        break;
      case 'ArrowLeft':
        if (cellIndex > 0) {
          currentRow.children[cellIndex - 1].focus();
        }
        e.preventDefault();
        break;
      case 'ArrowRight':
        if (cellIndex < currentRow.children.length - 1) {
          currentRow.children[cellIndex + 1].focus();
        }
        e.preventDefault();
        break;
    }
  }
});

function initializeMatrix(matrixId, size = 3) {
  const container = document.getElementById(matrixId);
  container.innerHTML = '';
  for (let i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.className = 'matrix-row';
    row.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let j = 0; j < size; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = '0';
      input.value = '';
      row.appendChild(input);
    }
    container.appendChild(row);
  }
}
function adjustRows(matrix, operation) {
  const container = document.getElementById(`matrix${matrix}`);
  const currentRows = container.children.length;
  const columns = container.firstElementChild.children.length;
  if (operation === 'add') {
    const newRow = document.createElement('div');
    newRow.className = 'matrix-row';
    newRow.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    for (let i = 0; i < columns; i++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = '0';
      input.value = '';
      newRow.appendChild(input);
    }
    container.appendChild(newRow);
  } else if (operation === 'remove' && currentRows > 1) {
    container.removeChild(container.lastChild);
  }
}
function adjustColumns(matrix, operation) {
  const container = document.getElementById(`matrix${matrix}`);
  const rows = container.children;
  const currentColumns = rows[0].children.length;
  if (operation === 'add') {
    Array.from(rows).forEach(row => {
      const input = document.createElement('input');
      input.type = 'number';
      input.placeholder = '0';
      input.value = '';
      row.appendChild(input);
      row.style.gridTemplateColumns = `repeat(${currentColumns + 1}, 1fr)`;
    });
  } else if (operation === 'remove' && currentColumns > 1) {
    Array.from(rows).forEach(row => {
      row.removeChild(row.lastChild);
      row.style.gridTemplateColumns = `repeat(${currentColumns - 1}, 1fr)`;
    });
  }
}
function calculateSingle(operation, matrix) {
  const matrixValues = getMatrixValues(`matrix${matrix}`);
  const resultContainer = document.getElementById('result');
  let result;
  switch (operation) {
    case 'determinant':
      result = determinant(matrixValues);
      resultContainer.innerHTML = `<div style="padding: 20px;">det(${matrix}) = ${result}</div>`;
      break;
    case 'transpose':
      result = transpose(matrixValues);
      displayMatrix(result, resultContainer);
      break;
    case 'inverse':
      result = inverse(matrixValues);
      if (typeof result === 'string') {
        resultContainer.innerHTML = `<div style="padding: 20px;">${result}</div>`;
      } else {
        displayMatrix(result, resultContainer);
      }
      break;
    case 'rank':
      result = rank(matrixValues);
      resultContainer.innerHTML = `<div style="padding: 20px;">rang(${matrix}) = ${result}</div>`;
      break;
    case 'trace':
      result = trace(matrixValues);
      resultContainer.innerHTML = `<div style="padding: 20px;">tr(${matrix}) = ${result}</div>`;
      break;
    case 'luDecomp':
      result = luDecomp(matrixValues);
      if (typeof result === 'string') {
        resultContainer.innerHTML = `<div style="padding: 20px;">${result}</div>`;
      } else {
        resultContainer.innerHTML = `
          <h4>Matrice L:</h4>
          ${displayMatrixHTML(result.L)}
          <h4>Matrice U:</h4>
          ${displayMatrixHTML(result.U)}
        `;
      }
      break;
  }
  addToHistory(operation, {
    matrix,
    input: matrixValues
  }, result);
}
function calculate(operation) {
  const matrixA = getMatrixValues('matrixA');
  const matrixB = getMatrixValues('matrixB');
  const resultContainer = document.getElementById('result');
  let result;
  switch (operation) {
    case 'multiply':
      result = multiplyMatrices(matrixA, matrixB);
      break;
    case 'addition':
      result = addMatrices(matrixA, matrixB);
      break;
    case 'subtract':
      result = subtractMatrices(matrixA, matrixB);
      break;
  }
  if (typeof result === 'string') {
    resultContainer.innerHTML = `<div style="padding: 20px;">${result}</div>`;
  } else {
    displayMatrix(result, resultContainer);
  }
  addToHistory(operation, {
    matrixA,
    matrixB
  }, result);
}
function getMatrixValues(matrixId) {
  const matrix = document.getElementById(matrixId);
  return Array.from(matrix.children).map(row => Array.from(row.children).map(input => input.value === '' ? 0 : parseFloat(input.value)));
}
function displayMatrix(matrix, container) {
  container.innerHTML = '';
  matrix.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'matrix-row';
    rowDiv.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
    row.forEach(value => {
      const input = document.createElement('input');
      input.type = 'number';
      input.value = value;
      input.readOnly = true;
      rowDiv.appendChild(input);
    });
    container.appendChild(rowDiv);
  });
}
function determinant(matrix) {
  if (matrix.length !== matrix[0].length) return "La matrice doit être carrée";
  if (matrix.length === 1) return matrix[0][0];
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  let det = 0;
  for (let i = 0; i < matrix[0].length; i++) {
    det += Math.pow(-1, i) * matrix[0][i] * determinant(minor(matrix, 0, i));
  }
  return det;
}
function minor(matrix, row, col) {
  return matrix.filter((_, index) => index !== row).map(row => row.filter((_, index) => index !== col));
}
function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}
function inverse(matrix) {
  if (matrix.length !== matrix[0].length) return "La matrice doit être carrée";
  const det = determinant(matrix);
  if (det === 0) return "Matrice non inversible";
  const adj = matrix.map((row, i) => row.map((_, j) => {
    const minorMatrix = minor(matrix, i, j);
    return Math.pow(-1, i + j) * determinant(minorMatrix);
  }));
  return transpose(adj).map(row => row.map(val => val / det));
}
function rank(matrix) {
  return Math.min(matrix.length, matrix[0].length);
}
function trace(matrix) {
  if (matrix.length !== matrix[0].length) return "La matrice doit être carrée";
  return matrix.reduce((sum, row, i) => sum + row[i], 0);
}
function luDecomp(matrix) {
  if (matrix.length !== matrix[0].length) return "La matrice doit être carrée";
  const n = matrix.length;
  const L = Array(n).fill().map(() => Array(n).fill(0));
  const U = Array(n).fill().map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    L[i][i] = 1;
    for (let j = i; j < n; j++) {
      U[i][j] = matrix[i][j];
      for (let k = 0; k < i; k++) {
        U[i][j] -= L[i][k] * U[k][j];
      }
    }
    for (let j = i + 1; j < n; j++) {
      L[j][i] = matrix[j][i];
      for (let k = 0; k < i; k++) {
        L[j][i] -= L[j][k] * U[k][i];
      }
      L[j][i] /= U[i][i];
    }
  }
  return {
    L,
    U
  };
}
function multiplyMatrices(a, b) {
  if (a[0].length !== b.length) return "Dimensions incompatibles";
  return a.map(row => b[0].map((_, j) => row.reduce((sum, val, i) => sum + val * b[i][j], 0)));
}
function addMatrices(a, b) {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    return "Dimensions incompatibles";
  }
  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
}
function subtractMatrices(a, b) {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    return "Dimensions incompatibles";
  }
  return a.map((row, i) => row.map((val, j) => val - b[i][j]));
}
function multiplyByScalar(matrix) {
  const scalar = prompt("Entrez le scalaire λ:");
  if (scalar === null || scalar === "") return;
  const λ = parseFloat(scalar);
  const matrixValues = getMatrixValues(`matrix${matrix}`);
  const result = matrixValues.map(row => row.map(val => val * λ));
  const resultContainer = document.getElementById('result');
  displayMatrix(result, resultContainer);
  addToHistory('scalarMultiply', {
    matrix,
    scalar: λ
  }, result);
}
let calculationHistory = [];
function toggleHistory() {
  const historySelect = document.getElementById('historySelect');
  historySelect.classList.toggle('show');
}
document.addEventListener('click', function (event) {
  const historySelect = document.getElementById('historySelect');
  const historyButton = document.querySelector('.history-button');
  if (!historySelect.contains(event.target) && !historyButton.contains(event.target)) {
    historySelect.classList.remove('show');
  }
});
document.querySelector('.history-button').addEventListener('click', function (event) {
  event.stopPropagation();
});
document.getElementById('historySelect').addEventListener('click', function (event) {
  if (!event.target.classList.contains('delete-icon')) {
    event.stopPropagation();
  }
});
function addToHistory(operation, matrices, result) {
  const timestamp = new Date().toLocaleTimeString();
  calculationHistory.unshift({
    operation,
    matrices,
    result,
    timestamp
  });
  updateHistorySelect();

  // Envoi des données à la base de données
  const formData = new FormData();
  formData.append('operation', operation);
  formData.append('matrices', JSON.stringify(matrices));
  formData.append('result', JSON.stringify(result));

  fetch('insert_matrix_history.php', {
    method: 'POST',
    body: formData
  }).then(response => response.text())
  .then(data => {
    console.log(data);
  }).catch(error => {
    console.error('Erreur lors de l\'ajout à l\'historique:', error);
  });
}

function addToHistory1(operation, matrices, result, date_heure) {
  calculationHistory.unshift({
    operation,
    matrices,
    result,
    timestamp: date_heure
  });
  updateHistorySelect();
}

window.addEventListener('DOMContentLoaded', (event) => {
  fetch('get_matrix_history.php')  // Appelle le fichier PHP
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        addToHistory1(item.operation, JSON.parse(item.matrices), JSON.parse(item.result), item.date_heure);  // Appelle la fonction addToHistory1
      });
    })
    .catch(error => console.error('Erreur lors de la récupération de l\'historique:', error));
});
function updateHistorySelect() {
  const select = document.getElementById('historySelect');
  select.innerHTML = '<button class="history-button delete-all-btn" onclick="deleteAllHistory()">Tout supprimer</button>';
  calculationHistory.forEach((item, index) => {
    const option = document.createElement('div');
    option.className = 'history-item';
    const label = document.createElement('span');
    label.textContent = `${item.timestamp} - ${formatHistoryLabel(item)}`;
    option.appendChild(label);
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete-icon';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.onclick = e => {
      e.stopPropagation();
      deleteHistoryItem(index);
    };
    option.appendChild(deleteBtn);
    option.onclick = () => loadHistoryItem(index);
    select.appendChild(option);
  });
}
function deleteHistoryItem(index) {
  calculationHistory.splice(index, 1);
  updateHistorySelect();
}
function loadHistoryItem(index) {
  const item = calculationHistory[index];
  if (!item) return;
  const resultContainer = document.getElementById('result');
  if (item.matrices) {
    if (item.matrices.matrixA && item.matrices.matrixB) {
      const matrixAContainer = document.getElementById('matrixA');
      const matrixBContainer = document.getElementById('matrixB');
      matrixAContainer.innerHTML = '';
      item.matrices.matrixA.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        rowDiv.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
        row.forEach(value => {
          const input = document.createElement('input');
          input.type = 'number';
          input.value = value;
          rowDiv.appendChild(input);
        });
        matrixAContainer.appendChild(rowDiv);
      });
      matrixBContainer.innerHTML = '';
      item.matrices.matrixB.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        rowDiv.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
        row.forEach(value => {
          const input = document.createElement('input');
          input.type = 'number';
          input.value = value;
          rowDiv.appendChild(input);
        });
        matrixBContainer.appendChild(rowDiv);
      });
    } else if (item.matrices.matrix && item.matrices.input) {
      const targetMatrix = document.getElementById(`matrix${item.matrices.matrix}`);
      targetMatrix.innerHTML = '';
      item.matrices.input.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        rowDiv.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
        row.forEach(value => {
          const input = document.createElement('input');
          input.type = 'number';
          input.value = value;
          rowDiv.appendChild(input);
        });
        targetMatrix.appendChild(rowDiv);
      });
    }
  }
  if (typeof item.result === 'string') {
    resultContainer.innerHTML = `<div style="padding: 20px;">${item.result}</div>`;
  } else if (Array.isArray(item.result)) {
    displayMatrix(item.result, resultContainer);
  } else if (item.result && item.result.L && item.result.U) {
    resultContainer.innerHTML = `
      <h4>Matrice L:</h4>
      ${displayMatrixHTML(item.result.L)}
      <h4>Matrice U:</h4>
      ${displayMatrixHTML(item.result.U)}
    `;
  }
}
function formatHistoryLabel(item) {
  switch (item.operation) {
    case 'multiply':
      return 'A×B';
    case 'addition':
      return 'A+B';
    case 'subtract':
      return 'A-B';
    case 'determinant':
      return `det(${item.matrices.matrix}) = ${item.result}`;
    case 'transpose':
      return `${item.matrices.matrix}'`;
    case 'inverse':
      return `${item.matrices.matrix}⁻¹`;
    case 'rank':
      return `rang(${item.matrices.matrix}) = ${item.result}`;
    case 'trace':
      return `tr(${item.matrices.matrix}) = ${item.result}`;
    case 'scalarMultiply':
      return `λ${item.matrices.matrix}`;    default:      return '';  }}function displayMatrixHTML(matrix) {  return `<div class="matrix-input">    ${matrix.map(row => `      <div class="matrix-row" style="grid-template-columns: repeat(${row.length}, 1fr)">        ${row.map(value => `          <input type="number" value="${value}" readonly>        `).join('')}
      </div>
    `).join('')}
  </div>`;
}
function deleteAllHistory() {
  if (confirm('Voulez-vous vraiment supprimer tout l\'historique?')) {
    // Suppression de tout l'historique de la base de données
    fetch('delete_all_history.php', {
      method: 'POST', // Assurez-vous que userId est défini
    }).then(response => response.text())
    .then(data => {
      console.log(data);
      calculationHistory = [];
      updateHistorySelect();
    }).catch(error => {
      console.error('Erreur lors de la suppression de tout l\'historique:', error);
    });
  }
}