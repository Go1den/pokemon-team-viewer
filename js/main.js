window.addEventListener("load", (event) => {
    refreshAll();
    setBG();
});

function refreshAll() {
    refresh(1);
    refresh(2);
    refresh(3);
    refresh(4);
    refresh(5);
    refresh(6);
}

function refresh(num) {
    let dexNum = document.getElementById("input" + num).value;
    let el = document.getElementById("pokemon" + num);
    if (dexNum < 10) {
        dexNum = "00" + dexNum;
    } else if (dexNum < 100) {
        dexNum = "0" + dexNum;
    }
    let imgSource = "https://www.serebii.net/pokemonhome/pokemon/" + dexNum + ".png";
    el.innerHTML = '<img id="image' + num + '" src="' + imgSource + '" />';
}

function setBG() {
    let name = document.getElementById("color1").value;
    console.log(name);
    document.getElementById("displayTable").style.backgroundColor = name;
}

function flip(num) {
    let el = document.getElementById("image" + num);
    if (el.classList.contains('flipped')) {
        el.classList.remove('flipped');
    } else {
        el.classList.add('flipped');
    }
}

function setOrientation() {
    let orientation = document.getElementById("orientation").value;
    let cols = Number(orientation.charAt(0));
    let rows = Number(orientation.charAt(2));
    let oldTable = document.getElementById("displayTable");
    let result = '';
    let newTable = document.createElement('table');
    newTable.id = "displayTable";
    let id = 1;
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            td.id = "pokemon" + id;
            tr.appendChild(td);
            id++;
        }
        newTable.appendChild(tr);
    }
    oldTable.parentNode.replaceChild(newTable, oldTable);
    refreshAll();
}