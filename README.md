# Task semplice

Applicazione personale senza dipendenze, account, scadenze o assegnatari.

## Uso

Apri `index.html` in un browser moderno (Edge, Chrome, Firefox o Safari).

- Scrivi una task e premi **Aggiungi** oppure Invio.
- Spunta la task per spostarla in **Fatto**.
- Togli la spunta per riportarla in **Da fare**.
- Premi **×** per eliminarla definitivamente.

Le task vengono salvate tramite `localStorage` solo nel browser e nel profilo utilizzati: non vengono sincronizzate tra dispositivi. Cancellare i dati del browser può eliminare le task. In modalità privata il salvataggio può durare solo fino alla chiusura. Se il salvataggio non è disponibile, la pagina mostra un avviso.

Per un uso continuativo, puoi pubblicare questi tre file (`index.html`, `style.css`, `app.js`) su un hosting statico HTTPS con un indirizzo stabile. Aprendo direttamente un file, la gestione del salvataggio dipende dal browser; spostare il file o passare all'hosting non trasferisce automaticamente le task già salvate.
