window.addEventListener("load", (event) => {
    setupPokemonDropdowns();
    setupItemDropdowns();
    refreshAll();
});

function setupPokemonDropdowns() {
    setupPokemonDropdown(1);
    setupPokemonDropdown(2);
    setupPokemonDropdown(3);
    setupPokemonDropdown(4);
    setupPokemonDropdown(5);
    setupPokemonDropdown(6);
}

function setupItemDropdowns() {
    setupItemDropdown(1);
    setupItemDropdown(2);
    setupItemDropdown(3);
    setupItemDropdown(4);
    setupItemDropdown(5);
    setupItemDropdown(6);
}

function refreshAll() {
    refresh(1);
    refresh(2);
    refresh(3);
    refresh(4);
    refresh(5);
    refresh(6);
    setBG();
}

function refresh(num) {
    let select = document.getElementById("input" + num);
    let pokemon = select.options[select.selectedIndex].text;
    let dexNum = globalPokemon.indexOf(pokemon) + 1;
    let el = document.getElementById("pokemon" + num);
    if (dexNum < 10) {
        dexNum = "00" + dexNum;
    } else if (dexNum < 100) {
        dexNum = "0" + dexNum;
    }
    let imgSource = "https://www.serebii.net/pokemonhome/pokemon/" + dexNum + ".png";
    let itemName = document.getElementById("item" + num).value;
    let itemSource = "https://www.serebii.net/itemdex/sprites/" + itemName.replace(/\s/g, "").toLowerCase() + ".png";
    let result = '<div class="imagesDiv"><img class="pokemonimage" id="image' + num + '" src="' + imgSource + '" />';
    if (itemName !== "No Item" && itemName !== "") {
        result += '<img class="itemimage" id="itemimage' + num + '" src="' + itemSource + '" />';
    }
    el.innerHTML = result + '</div>';

    let imageEl = document.getElementById("image" + num);
    imageEl.style.width = document.getElementById("imageSize").value;
    imageEl.style.height = document.getElementById("imageSize").value;

    let itemImageEl = document.getElementById("itemimage" + num);
    if (itemImageEl !== null) {
        itemImageEl.style.width = document.getElementById("itemSize").value;
        itemImageEl.style.height = document.getElementById("itemSize").value;
    }
}

function setBG() {
    let name = document.getElementById("color1").value;
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

function setupItemDropdown(num) {
    let dropdown = document.getElementById("item" + num);
    let options = "";
    for (const item of globalItems) {
        if (item === "No Item") {
            options += "<option selected>" + item + "</option>";
        } else {    
            options += "<option>" + item + "</option>";
        }
    }
    dropdown.innerHTML = options;
}

function setupPokemonDropdown(num) {
    let sortedPokemon = globalPokemon.toSorted();
    let datalist = document.getElementById("input" + num);
    let options = '<option selected disabled value="---">Select a Pokemon</option>';
    let index = 1;
    for (const pokemon of sortedPokemon) {
        options += '<option value="' + index + '">' + pokemon + '</option>';
        index++;
    }
    datalist.innerHTML = options; 
}