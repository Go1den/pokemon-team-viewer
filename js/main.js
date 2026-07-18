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
    let name = document.getElementById("input" + num).value;
    name = name.toLowerCase();
    let el = document.getElementById("pokemon" + num);
    let imgSource = "https://www.serebii.net/pokemonhome/pokemon/" + name + ".png";
    el.innerHTML = '<img src="' + imgSource + '" />';
}

function setBG() {
    let name = document.getElementById("color1").value;
    console.log(name);
    document.getElementById("table1").style.backgroundColor = name;
}