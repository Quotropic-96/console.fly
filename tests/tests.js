// const playerName = 'new';
// const score = 63;
// localStorage.setItem(playerName, score);
// console.log(localStorage);

function updateScoreTable() {
    const nameInput = document.getElementById('name-input').value;
    
    let bestPlayers = [];
    for (var player in localStorage) {
        if (typeof localStorage[player] === 'string') {
            bestPlayers.push([player, localStorage[player]]);
        }
    }
    
    bestPlayers.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    const table = document.getElementById('score-table');
    
    let tableRow = ''
    bestPlayers.forEach((run, position) => {
        if (position <= 2) {
            tableRow = `<tr><td>${run[0]}</td><td>${run[1]}</td></tr>`;
            table.innerHTML += tableRow;
        }
    });
}


