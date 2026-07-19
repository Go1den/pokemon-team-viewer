window.addEventListener("load", (event) => {
    refresh(1);
    refresh(2);
    refresh(3);
    refresh(4);
    refresh(5);
    refresh(6);
    setBG();
});

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
    document.getElementById("table1").style.backgroundColor = name;
}

function flip(num) {
    let el = document.getElementById("image" + num);
    if (el.classList.contains('flipped')) {
        el.classList.remove('flipped');
    } else {
        el.classList.add('flipped');
    }
}
