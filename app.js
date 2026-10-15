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

let bokningar = [
    { id: 1, hund: "Bella", datum: "2026-10-20" },
    { id: 2, hund: "Max", datum: "2026-10-22" }
];

function renderaBokningar() {
    bokaLista.innerHTML = "";
    bokningar.forEach(function (bokning) {
        const li = document.createElement("li");
        li.textContent = bokning.hund + " – " + bokning.datum;
        bokaLista.appendChild(li);
    });
}

renderaBokningar(); 
 
   