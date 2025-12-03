Så jag har gjort allting förutom style.css och själva storyn. style.css på grund av att jag inte hade mer tid på grund av att jag var sjuk en hel vecka plus lördagen och söndagen.

Med det sagt så har jag byggt en dynamisk webbserver med Express. Tanken är att servern inte bara levererar färdiga filer, utan bygger ihop sidan varje gång någon klickar på en länk. Så här går det till steg för steg:

1. Request (Förfrågan): Klienten (webbläsaren) klickar på ett val, t.ex. länken /story/1-vapenvila.

2. Servern tar emot: Min Express-app ser att URL:en matchar routen /story/:id.

3. Hämta data: Servern använder ID:t (i detta fall "1-vapenvila") för att leta upp rätt stycke text och rätt val i min JSON-fil (chapter-1.json).

4. Rendera: Servern skickar datan till Nunjucks-mallen (story.njk). Nunjucks fyller i {{ title }}, {{ text }} och skapar knapparna med en loop.

5. Response (Svar): Den färdiga HTML-sidan skickas tillbaka till användaren.

Och för skillnaden mellan 11ty så tycker jag att den största skillnaden är när sidorna skapas.
11ty (Statisk): Där bygger man alla HTML-filer i förväg på sin egen dator. När man laddar upp sidan finns redan alla filer klara. Det går snabbt men är svårt att göra interaktivt på djupet.

Express (Dynamisk): Här skapas HTML-sidan "live" när användaren ber om den. Det gör att jag kan använda en enda mall (story.njk) för att visa tusentals olika berättelsedelar, istället för att skapa en fil för varje del.

Routes och organiseringen var i stor del enkel, jag valde att dela upp koden för att hålla den ren och snygg (modulerisera?).
routes/index.js: Hanterar bara startsidan (/).
routes/story.js: Hanterar själva spelet (/story/:id).
data/chapter-1.json: Här ligger all text.

Varför? Om jag hade haft allt i en fil (server.js) hade den blivit rörig och svårläst. Genom att separera "logiken" (routes) från "innehållet" (JSON) kan jag enkelt skriva mer på berättelsen utan att riskera att paja koden.

Hur systemet fungerar (Navigation)
Systemet bygger på noder i en trädstruktur.

Användaren börjar på noden "start".

Varje val i berättelsen är en länk till ett nytt ID (t.ex. /story/gren-A-plikt).

Jag använder dynamiska routes i Express (:id). Det betyder att jag inte behöver skriva en route för varje val. Koden req.params.id fångar upp vad som står i URL:en och hämtar automatiskt motsvarande del från JSON-filen. Det gör det väldigt enkelt att lägga till nya delar i storyn – jag behöver bara uppdatera JSON-filen, inte koden.

Nya features
Förutom grundläggande Express-funktionalitet har jag lagt till:

JSON-baserad Story Engine: En motor som läser in berättelsen från en separat fil.

Cyberpunk-design: En style.css med pixel-font (VT323), scanlines och neonfärger för att matcha temat.

Loopande val: Nunjucks-koden loopar automatiskt igenom alla val som finns för en viss scen, oavsett om det är 1 eller 4 val.

Förbättringar jag skulle vilja göra skulle jag göra mycket mer men jag hade inte nog tid eller visste inte först hur man skulle göra det, men om jag hade mer tid skulle jag vilja lägga till:

Inventory-system (Sessioner): Just nu kommer spelet inte ihåg om man har plockat upp ett föremål (t.ex. nyckelkortet). Jag skulle kunna använda express-session för att spara variabler som hasKeyCard = true, vilket skulle kunna låsa upp nya val senare i spelet.

Spara-funktion: Möjlighet för användaren att spara var de är, kanske genom att spara deras nuvarande ID i en cookie eller LocalStorage.

Ljud: Lägga till bakgrundsljud som ändras beroende på vilken "gren" man är på (t.ex. lugnt ljud för Plikt, stressigt för Hämnd).