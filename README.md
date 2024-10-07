# Timeflow TEST

## Istruzioni

### Autenticazione:
In alto a destra si può decidere si autenticarsi con un utente già esistente oppure registrarsi con un nuovo utente.
Utente già esistente è "rossi.mario". La password non è controllata, quindi si può inserire qualunque cosa.

Nel form di registrazione ci sono diversi controlli sui campi:

- User Type: dropdown di selezione tipologia utente: Ci si può registrare come cliente o come fornitore. Campo obbligatorio.
- Username: deve essere di almeno 5 caratteri o può contenere solo lettere e numeri.
- Email: deve rispettare il formato di un indirizzo e-mail
- Password: deve avere almeno 8 caratteri, tra cui: almeno una maiuscola, una minuscola, un numero e un carattere speciale.
- Conferma Password: controllo di coerenza.

### Funzionalità:
Nel menu in alto a sinistra abbiamo le due pagine richieste nel test.

#### Users
La gestione utente permette di visualizzare, modificare, aggiungere ed eliminare gli utenti.
Sono state aggiunte le funzioni aggiuntive tra cui:

- Ordinamento: si può ordinare per: Data inserimento, Username, E-mail, User Type, Full Name. Si può ordinare sia in ordine crescente che decrescente.
- Filtro: si può filtrare per tipologia utente.
- Layout: Si possono visualizzare gli utenti sia in modalità card che in modalità pseudo tabellare


#### Reviews
Permette la visualizzazione e l'inserimento di recensioni sui fornitori.
Si seleziona il fornitori (pulsante Change Supplier) e si visualizzano le recensioni. L'inserimento della recensione permette di dare un voto da 1 a 5 tramite il classico sistema a stelle (componente creato "in casa")
e scrivere una recensione testuale. Username e data vengono inseriti automaticamente in base all'utente loggato e il momento in cui viene salvata la recensione.

