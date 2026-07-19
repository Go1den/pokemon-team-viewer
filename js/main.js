window.addEventListener("load", (event) => {
    setupPokemonDropdowns();
    setupItemDropdowns();
    decodeURL();
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

function refreshURL() {
    let urlEl = document.getElementById("url");
    urlEl.value = getURL();
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
    let itemSelect = document.getElementById("item" + num);
    let itemName = itemSelect.options[itemSelect.selectedIndex].text;
    let itemSource = "https://www.serebii.net/itemdex/sprites/" + itemName.replace(/\s/g, "").toLowerCase() + ".png";
    let result = '<div class="imagesDiv"><img class="pokemonimage" id="image' + num + '" src="' + imgSource + '" />';
    if (itemName !== "No Item" && itemName !== "" && itemName !== "0") {
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

    refreshURL();
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
    let index = 0;

    for (const item of globalItems) {
        options += '<option value="' + index + '">' + item + '</option>';
        index++;
    }

    dropdown.innerHTML = options;
}

function setupPokemonDropdown(num) {
    let sortedPokemon = globalPokemon.toSorted();
    let datalist = document.getElementById("input" + num);
    let options = '<option selected disabled value="0">Select a Pokemon</option>';
    let index = 1;
    for (const pokemon of sortedPokemon) {
        options += '<option value="' + index + '">' + pokemon + '</option>';
        index++;
    }
    datalist.innerHTML = options; 
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function toBase62(num) {
    let result = '';
    do {
        result = BASE62[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num > 0);
    return result;
}

function fromBase62(str) {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * 62 + BASE62.indexOf(str[i]);
    }
    return num;
}

function encodePair(pID, itemID) {
    pID = isNaN(pID) ? 0 : pID;
    itemID = isNaN(itemID) ? 0 : itemID;
    pID = Math.min(Math.max(pID, 0), globalPokemon.length);
    itemID = Math.min(Math.max(itemID, 0), globalItems.length);
    const packed = (pID << 8) | itemID;
    let encoded = toBase62(packed);
    while (encoded.length < 3) {
        encoded = '0' + encoded;
    }
    return encoded;
}

function getURL() {
    const pairs = [];
    for (let i = 1; i <= 6; i++) {
        let pID = parseInt(document.getElementById(`input${i}`).value, 10);
        let itemID = parseInt(document.getElementById(`item${i}`).value, 10);
        pairs.push(encodePair(pID, itemID));
    }
    const compactString = pairs.join('');
    const baseUrl = "go1den.com/pokemon-team-viewer/";
    const fullUrl = `${baseUrl}?data=${compactString}`;
    return fullUrl;
}

function decodeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('data')) {
        const dataStr = urlParams.get('data');
        const pairs = dataStr.match(/.{3}/g);
        for (let i = 0; i < pairs.length; i++) {
            const num = fromBase62(pairs[i]);
            const pID = num >> 8;
            const itemID = num & 0xFF;

            document.getElementById(`input${i + 1}`).value = pID;
            document.getElementById(`item${i + 1}`).value = itemID;
        }
    }
}

function copyToClipboard() {
    let el = document.getElementById("url");
    el.select();
    document.execCommand("copy");
}