let display = document.querySelector('.display');
let formula = document.querySelector('#formula');
let buttons = Array.from(document.querySelectorAll('.buttons button'));
let historyContainer = document.getElementById('historyDropdown');
let calculations = [];
let currentInput = '';
let previousInput = '';
let operator = '';
let formulaString = '';

let historyToggle = document.getElementById('historyToggle');
let historyDropdown = document.getElementById('historyDropdown');
let historyCount = document.getElementById('historyCount');
let historyDeleteAll = document.getElementById('historyDeleteAll');



window.addEventListener('DOMContentLoaded', (event) => {
  fetch('get_history.php')  // Appelle le fichier PHP
      .then(response => response.json())
      .then(data => {
          data.forEach(item => {
              addToHistory1(item.formule, item.heure);  // Appelle la fonction addToHistory1
          });
      })
      .catch(error => console.error('Erreur lors de la récupération de l\'historique:', error));
});

function addToHistory1(calculation, timeString) {
  let historyEntry = document.createElement('div');
  historyEntry.className = 'history-entry';

  let timeSpan = document.createElement('span');
  timeSpan.className = 'history-entry-time';
  timeSpan.textContent = timeString;  // Utilisation de l'heure de la BDD

  let calcSpan = document.createElement('span');
  calcSpan.className = 'history-entry-calculation';
  calcSpan.textContent = calculation;

  let deleteButton = document.createElement('button');
  deleteButton.className = 'history-entry-delete';
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.addEventListener('click', function() {
      historyDropdown.removeChild(historyEntry);

      const index = calculations.findIndex(calc =>
          calc.formula + ' = ' + calc.result === calculation
      );
      if (index !== -1) {
          calculations.splice(index, 1);
      }
      historyCount.textContent = calculations.length;
  });

  historyEntry.appendChild(timeSpan);
  historyEntry.appendChild(calcSpan);
  historyEntry.appendChild(deleteButton);
  historyDropdown.insertBefore(historyEntry, historyDropdown.childNodes[1]);

  calculations.push({
      formula: calculation.split(' = ')[0],
      result: calculation.split(' = ')[1]
  });

  historyCount.textContent = calculations.length;
}





function updateDisplay(value) {
  display.value = value;
}

function updateFormula(value) {
  formula.textContent = value;
}

function safeEval(formula) {
  formula = formula
    .replace(/x/g, '*')  
    .replace(/π/g, Math.PI)  
    .replace(/e/g, Math.E)  
    .replace(/√/g, 'Math.sqrt')  
    .replace(/\^/g, '**')  
    .replace(/%/g, '/100');  

  try {
    return eval(formula);
  } catch (error) {
    console.error('Evaluation error:', error);
    return 'Error';
  }
}

function handleSpecialFunction(func, value) {
  let num = value ? parseFloat(value) : 0;
  switch (func) {
    case 'sin':
      return Math.sin(num * Math.PI / 180);
    case 'cos':
      return Math.cos(num * Math.PI / 180);
    case 'tan':
      return Math.tan(num * Math.PI / 180);
    case 'log':
      return Math.log10(num);
    case '√':
      return Math.sqrt(num);
    case 'x!':
      return factorial(num);
    case 'e':
      return Math.exp(value);
    default:
      return num;
  }
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function addToHistory(calculation, entryId = null) { 
  console.log(calculation);
  const formData = new FormData();
  formData.append('calculation', calculation);
  
  // Insertion en base de données
  fetch('insert_calc.php', {
      method: 'POST',
      body: formData
  }).then(response => response.text())
  .then(data => {
      console.log(data);  // Log du message de réponse (succès ou erreur)
      
      // Récupère l'ID retourné par la base de données
      const responseData = JSON.parse(data);
      const insertedId = responseData.inserted_id;
      
      // Crée l'entrée de l'historique dans l'interface
      const now = new Date();
      const timeString = now.toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
      });
      
      let historyEntry = document.createElement('div');
      historyEntry.className = 'history-entry';
      
      let timeSpan = document.createElement('span');
      timeSpan.className = 'history-entry-time';
      timeSpan.textContent = timeString;
      
      let calcSpan = document.createElement('span');
      calcSpan.className = 'history-entry-calculation';
      calcSpan.textContent = calculation;
      
      let deleteButton = document.createElement('button');
      deleteButton.className = 'history-entry-delete';
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      
      // Suppression côté client et base de données
      deleteButton.addEventListener('click', function() {
          if (confirm('Voulez-vous vraiment supprimer cette entrée ?')) {
              const deleteFormData = new FormData();
              deleteFormData.append('id', insertedId);  // Envoie l'ID pour suppression
              
              fetch('delete_entry.php', {
                  method: 'POST',
                  body: deleteFormData
              })
              .then(response => response.json())
              .then(result => {
                  if (result.status === 'success') {
                      historyDropdown.removeChild(historyEntry);
                      const index = calculations.findIndex(calc => 
                          calc.formula + ' = ' + calc.result === calculation
                      );
                      if (index !== -1) {
                          calculations.splice(index, 1);
                      }
                      historyCount.textContent = calculations.length;
                  } else {
                      alert('Erreur lors de la suppression.');
                  }
              })
              .catch(error => console.error('Erreur:', error));
          }
      });
      
      historyEntry.appendChild(timeSpan);
      historyEntry.appendChild(calcSpan);
      historyEntry.appendChild(deleteButton);
      
      historyDropdown.insertBefore(historyEntry, historyDropdown.childNodes[1]);
      
      calculations.push({
          formula: calculation.split(' = ')[0],
          result: calculation.split(' = ')[1]
      });
      
      // Met à jour le compteur d'historique
      historyCount.textContent = calculations.length;
  })
  .catch(error => {
      console.error('Error:', error);
  });
}


function deleteAllHistory() {
    // Show confirmation dialog
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer tout l\'historique ?');
    
    if (confirmDelete) {

      fetch('clear_history.php', {
            method: 'POST'  // Requête POST pour exécuter le script PHP
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Historique supprimé avec succès.');
                historyDropdown.innerHTML = '';  // Supprime tout l'historique de l'interface
                calculations = [];  // Vide le tableau de calculs
                historyCount.textContent = '0';  // Met à jour le compteur
            } else {
                alert('Erreur lors de la suppression.');
            }
        })
        .catch(error => console.error('Erreur lors de la suppression de l\'historique:', error));

        // Clear the calculations array
        calculations = [];
        
        // Clear the history dropdown
        while (historyDropdown.childNodes.length > 1) {
            historyDropdown.removeChild(historyDropdown.childNodes[1]);
        }
        
        // Update the history count
        historyCount.textContent = '0';
    }
}

historyDeleteAll.addEventListener('click', deleteAllHistory);

buttons.forEach(button => {
  button.addEventListener('click', function () {
    let buttonText = this.textContent;

    if (buttonText === 'AC') {
      currentInput = '';
      previousInput = '';
      operator = '';
      formulaString = '';
      updateDisplay('0');
      updateFormula('');
    } else if (buttonText === 'CE') {
      if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        formulaString = formulaString.slice(0, -1);
      }
      updateDisplay(currentInput || '0');
      updateFormula(formulaString);
    } else if (buttonText === '=') {
      if (formulaString) {
        try {
          let result = safeEval(formulaString);
          updateDisplay(result);
          let calculationString = `${formulaString} = ${result}`;
          addToHistory(calculationString);
          formulaString = result.toString();
          currentInput = result.toString();
          updateFormula('');
        } catch (e) {
          updateDisplay('Error');
          console.error(e);
        }
      }
    } else if (buttonText === 'e') {
      if (currentInput) {
        let value = parseFloat(currentInput);
        formulaString = `e^${value}`;
        currentInput = Math.exp(value).toString();
        updateDisplay(currentInput);
        updateFormula(formulaString);
      } else {
        currentInput = Math.E.toString();
        formulaString += 'e';
        updateDisplay(currentInput);
        updateFormula(formulaString);
      }
    } else if (['sin', 'cos', 'tan', 'log', '√', 'x!'].includes(buttonText)) {
      if (currentInput) {
        let result = handleSpecialFunction(buttonText, currentInput);
        currentInput = result.toString();
        formulaString = `${buttonText}(${formulaString})`;
        updateDisplay(currentInput);
        updateFormula(formulaString);
      }
    } else if (buttonText === 'π') {
      currentInput = Math.PI.toString();
      formulaString += 'π';
      updateDisplay(currentInput);
      updateFormula(formulaString);
    } else if (buttonText === 'x^y') {
      if (currentInput) {
        formulaString += '^';
        currentInput += '^';
        updateDisplay(currentInput);
        updateFormula(formulaString);
      }
    } else if (buttonText === '%') {
      if (currentInput) {
        formulaString += '%';
        currentInput += '%';
        updateDisplay(currentInput);
        updateFormula(formulaString);
      }
    } else if (['+', '-', 'x', '/', '%'].includes(buttonText)) {
      if (currentInput) {
        formulaString += buttonText === 'x' ? '*' : buttonText;
        currentInput = '';
        updateFormula(formulaString);
      }
    } else {
      currentInput += buttonText;
      formulaString += buttonText;
      updateDisplay(currentInput);
      updateFormula(formulaString);
    }
  });
});

historyToggle.addEventListener('click', function() {
    historyDropdown.classList.toggle('active');
});

document.addEventListener('click', function(event) {
    if (!historyToggle.contains(event.target) && !historyDropdown.contains(event.target)) {
        historyDropdown.classList.remove('active');
    }
});

