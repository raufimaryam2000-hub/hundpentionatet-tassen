// console.log("app.js fungerar!");
const klockaElement = document.getElementById("klocka");
const datumElement = document.getElementById("datum");
const statusElement = document.getElementById("status");

function formateraTid(datum) {
    const timmar = String (datum.getHours()).padStart(2,"0");
    const minuter = String(datum.getMinutes()).padStart(2,"0");
    const sekunder = String(datum.getSeconds()).padStart(2,"0");
    return timmar + ":" + minuter + ":" + sekunder;

}

function formateraDatum(datum) {
    return datum.toLocaleDateString("sv-SE",{
        weekday: "long",
        day: "numeric",
        month: "long"

    });
}

function arOppet(datum) {
    const dag = datum.getDay();
    const time = datum.getHours();

    if (dag >= 1 && dag <= 5) {
        return time >= 7 && time < 18;
    }
    if (dag === 6) {
        return time >= 9 && time < 14;
    }
    return false;
}

function  uppdateraKlocka() {
    const nu = new Date();
    klockaElement.textContent = formateraTid(nu);
    datumElement.textContent = formateraDatum(nu);
    statusElement.textContent = arOppet(nu) ? "Öppet just nu" : "Stängt just nu";
}

uppdateraKlocka(); 
setInterval(uppdateraKlocka, 1000);

const bokaLista = document.getElementById("boka-lista");

function laddaBokningar() {
    const sparad = localStorage.getItem("bokningar");
    if (sparad === null) {
        return [];
    }
    return JSON.parse(sparad);
}

let bokningar = laddaBokningar();

function sparaBokningar() {
    localStorage.setItem("bokningar", JSON.stringify(bokningar));
}

function renderaBokningar() {
    bokaLista.innerHTML = "";

    if (bokningar.length === 0) {
        const tom = document.createElement("li");
        tom.textContent = "Inga förfrågningar än.";
        bokaLista.appendChild(tom);
        return;
    }

    bokningar.forEach(function (bokning) {
        const li = document.createElement("li");
        li.textContent = bokning.hund + " - " + bokning.datum + " ";

        const knapp = document.createElement("button");
        knapp.type = "button";
        knapp.textContent = "Avboka";
        knapp.dataset.id = bokning.id;

        li.appendChild(knapp);
        bokaLista.appendChild(li);
    });
}
renderaBokningar();

bokaLista.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") {
        return;
    }

    const id = Number(event.target.dataset.id);
    bokningar = bokningar.filter(function (bokning) {
        return bokning.id !== id;
    });
    sparaBokningar();
    renderaBokningar(); 
});

const formular = document.getElementById("boka-formular");
const hundInput = document.getElementById("hund");
const datumInput = document.getElementById("datum-onskat");
const felElement = document.getElementById("boka-fel");

formular.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const hund = hundInput.value.trim();
    const datum = datumInput.value;

    if (hund === "" || datum === "") {
        felElement.textContent = "Fyll i både hundens namn och önskat datum.";
        return;
    }

        felElement.textContent = "";

    bokningar.push({ id: Date.now(), hund: hund, datum: datum });
    sparaBokningar();
    renderaBokningar();
    formular.reset();
});   

    