const functionHistory = [];

function insertFunction(value) {
    const input = document.getElementById('functionInput');
    if (!input) return; // Vérification si l'élément existe
    const cursorPos = input.selectionStart;
    const textBefore = input.value.substring(0, cursorPos);
    const textAfter = input.value.substring(cursorPos);
    if (value === 'floor(') {
        input.value = textBefore + 'E(' + textAfter;
    } else {
        input.value = textBefore + value + textAfter;
    }
    const newPos = cursorPos + (value === 'floor(' ? 2 : value.length);
    input.setSelectionRange(newPos, newPos);
    input.focus();
}

function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}

function addToHistory(func) {

    // Envoi des données à la base de données
    const formData1 = new FormData();
    formData1.append('func', func);

    fetch('insert_graph.php', {
        method: 'POST',
        body: formData1
    }).then(response => response.text())
    .then(data => {
        console.log(data);
    })

    functionHistory.unshift({
        function: func,
        timestamp: getFormattedTime()
    });
    if (functionHistory.length > 5) functionHistory.pop();
    updateHistoryDisplay();
}

function deleteFromHistory(index) {
    if (index < 0 || index >= functionHistory.length) return; // Vérification index valide
    functionHistory.splice(index, 1);
    updateHistoryDisplay();
}

function clearHistory() {
    if (confirm('Voulez-vous vraiment supprimer tout l\'historique?')) {
        // Suppression de l'historique de la base de données
        fetch('delete_history.php', {
            method: 'POST'
        }).then(response => response.text())
        .then(data => {
            console.log(data);
            functionHistory.length = 0;
            updateHistoryDisplay();
        }).catch(error => {
            console.error('Erreur lors de la suppression de l\'historique:', error);
        });
    }
}

function updateHistoryDisplay() {
    const historyDiv = document.getElementById('history');
    if (!historyDiv) return; // Vérification si l'élément existe
    historyDiv.innerHTML = functionHistory.map((entry, index) => `
        <div class="history-item">
            <div class="history-content" onclick="setFunctionAndPlot('${entry.function.replace(/'/g, "\\'")}')">
                <div class="function-text">${entry.function}</div>
                <div class="timestamp">${entry.timestamp}</div>
            </div>
            <button class="delete-btn" onclick="deleteFromHistory(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function setFunctionAndPlot(func) {
    const input = document.getElementById('functionInput');
    if (!input) return; // Vérification si l'élément existe
    input.value = func;
    const plotButton = document.getElementById('plotButton');
    if (plotButton) plotButton.click();
}

function isValidPoint(x, userInput) {
    try {
        const processedInput = userInput
            .replace(/E\(([^)]+)\)/g, 'floor($1)')
            .replace(/\|([^|]+)\|/g, 'abs($1)');
        const y = math.evaluate(processedInput, { x });
        return !isNaN(y) && isFinite(y);
    } catch {
        return false;
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById('functionsDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function toggleHistoryDropdown() {
    const dropdown = document.getElementById('historyDropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

window.onclick = function (event) {
    if (!event.target.matches('.dropdown-button')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
};

document.getElementById('plotButton')?.addEventListener('click', () => {
    const input = document.getElementById('functionInput');
    if (!input) return;
    const userInput = input.value;
    if (!userInput) return;
    try {
        addToHistory(userInput);
        const xValues = [];
        const yValues = [];
        for (let x = -10; x <= 10; x += 0.01) {
            x = Number(x.toFixed(10));
            const processedInput = userInput.replace(/\blog\b/g, 'log');
            if (isValidPoint(x, processedInput)) {
                const y = math.evaluate(processedInput, { x });
                xValues.push(x);
                yValues.push(y);
            } else if (xValues.length > 0) {
                xValues.push(x);
                yValues.push(null);
            }
        }
        const trace = {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'rgb(22, 255, 197)', width: 2 },
            name: userInput,
            connectgaps: false
        };
        const layout = {
            title: {
                text: `f(x) = ${userInput}`,
                font: { color: '#fff', size: 16 }
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: {
                gridcolor: 'rgba(22, 255, 197, 0.1)',
                zerolinecolor: 'rgb(22, 255, 197)',
                color: '#fff',
                title: 'x'
            },
            yaxis: {
                gridcolor: 'rgba(22, 255, 197, 0.1)',
                zerolinecolor: 'rgb(22, 255, 197)',
                color: '#fff',
                title: 'y'
            },
            showlegend: false,
            margin: { t: 50, l: 50, r: 30, b: 50 }
        };
        Plotly.newPlot('graph', [trace], layout);
    } catch (error) {
        alert('Erreur: Vérifiez votre fonction');
        console.error(error);
    }
});

function addToHistory1(func, date_heure) {
    functionHistory.unshift({
        function: func,
        timestamp: date_heure
    });
    if (functionHistory.length > 5) functionHistory.pop();
    updateHistoryDisplay();
}

window.addEventListener('DOMContentLoaded', (event) => {
    fetch('get_history_graph.php')  // Appelle le fichier PHP
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                addToHistory1(item.funct, item.heure);  // Appelle la fonction addToHistory1
            });
        })
        .catch(error => console.error('Erreur lors de la récupération de l\'historique:', error));
});