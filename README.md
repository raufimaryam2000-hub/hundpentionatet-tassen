# Hundpensionatet Tassen
En kundsida för ett litet hunddagis och pensionat, byggd med HTML, CSS och JavaScript.

## Hur man kör projektet 
Öppna `index.html` i webbläsaren, eller starta Live Server i VS Code (högerklicka på index.html och välj "Open with Live Server").

## Reflektion 
**Vad var svårast?**
Det svåraste var att byta ut den gamla bokningskoden mot klassen, eftersom sidan gick sönder medan jag byggde om. Dessutom var det svårt att förstå ordningen i formuläret, eftersom variablerna måste skapas innan de används.

**Vad lärde jag mig?**
Jag lärde mig att en klass samlar data och funktioner på ett ställe och kan hantera sin egen lista. Jag lärde mig också att först ändra arrayen, spara ändringen och sedan uppdatera listan på webbsidan. Jag förstod hur `localStorage` fungerar med `JSON.stringify` och `JSON.parse`. Till sist lärde jag mig att läsa felmeddelanden i konsolen för att hitta och rätta till buggar.


## En bugg jag fastnade på 
Jag fick felmeddelandet `bokningar is not defined` i konsolen efter att jag tagit bort den gamla variabeln. Felet kom eftersom `renderaBokningar` fortfarande försökte använda variabeln som inte fanns längre. Jag hittade felet genom att läsa felmeddelandet, som pekade på `renderaBokningar` på rad 88. Jag löste problemet genom att ändra till `bokningslista.bokningar`, vilket gjorde att koden fungerade igen.

## Scope och this
```js
constructor() {
    this.bokningar = this.ladda();
}

laggTill(hund, datum) {
    this.bokningar.push({ id: Date.now(), hund: hund, datum: datum });
    this.spara();
}
```

Jag lärde mig att `this` pekar på objektet som skapats från klassen `Bokningslista`. Med `this.bokningar` kan metoderna lägga till bokningar och spara ändringarna i samma lista. Därför vet koden vilket objekt som ska ändras när jag anropar `bokningslista.laggTill(...)`.

## Val av layout 
Jag använde Grid för tjänstekorten eftersom de ska ligga i ett rutnät där alla kort får samma storlek, och rutnätet anpassar antalet kolumner efter skärmens bredd. På mobil hamnar korten under varandra. Jag använde Flexbox för menyn eftersom den bara är en rad med länkar som ska ha lika avstånd (gap) och kunna radbrytas (flex-wrap). Skillnaden är att Grid passar när innehållet ordnas i både rader och kolumner, medan Flexbox passar när det bara går i en riktning. 

## Val av loop 
I `renderaBokningar` använde jag forEach för att gå igenom varje bokning och skapa en lista med en knapp. Den passar bra eftersom jag vill göra samma sak för varje bokning och inte behöver någon räknare. Jag valde inte map eftersom jag inte behöver skapa en ny array, och inte en vanlig for loop eftersom jag inte behöver använda en räknare.   