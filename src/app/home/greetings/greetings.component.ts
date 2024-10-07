import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-greetings',
  template: `
    <h1>Benvenuto!</h1>
    <h3>Istruzioni:</h3>
    <p>
      <strong>Autenticazione:</strong><br/>
      In alto a destra si può decidere si autenticarsi con un utente già esistente oppure registrarsi con un nuovo utente.<br/>
      Utente già esistente è "rossi.mario". La password non è controllata, quindi si può inserire qualunque cosa.<br/>
    </p>
    <p>Nel form di registrazione ci sono diversi controlli sui campi:</p>
    <ul>
      <li>User Type: dropdown di selezione tipologia utente: Ci si può registrare come cliente o come fornitore. Campo obbligatorio.</li>
      <li>Username: deve essere di almeno 5 caratteri o può contenere solo lettere e numeri. </li>
      <li>Email: deve rispettare il formato di un indirizzo e-mail</li>
      <li>Password: deve avere almeno 8 caratteri, tra cui: almeno una maiuscola, una minuscola, un numero e un carattere speciale.</li>
      <li>Conferma Password: controllo di coerenza.</li>
    </ul>
    <p>
      <strong>Funzionalità:</strong><br/>
      Nel menu in alto a sinistra abbiamo le due pagine richieste nel test.
    </p>
    <p>
      <strong>Users</strong><br/>
      La gestione utente permette di visualizzare, modificare, aggiungere ed eliminare gli utenti.<br>
      Sono state aggiunte le funzioni aggiuntive tra cui:
    </p>
    <ul>
      <li>Ordinamento: si può ordinare per: Data inserimento, Username, E-mail, User Type, Full Name. Si può ordinare sia in ordine crescente che decrescente.</li>
      <li>Filtro: si può filtrare per tipologia utente.</li>
      <li>Layout: Si possono visualizzare gli utenti sia in modalità card che in modalità pseudo tabellare</li>
    </ul>
    <p>
      <strong>Reviews</strong><br/>
      Permette la visualizzazione e l'inserimento di recensioni sui fornitori.<br>
      Si seleziona il fornitori (pulsante Change Supplier) e si visualizzano le recensioni.
      L'inserimento della recensione permette di dare un voto da 1 a 5 tramite il classico sistema a stelle (componente creato "in casa")<br/>
      e scrivere una recensione testuale. Username e data vengono inseriti automaticamente in base all'utente loggato e il momento in cui viene salvata la recensione.
    </p>
    <br><br><br>
    <h2>Buon divertimento</h2>
    Andrea Persano
  `,
  styles: [
  ]
})
export class GreetingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
