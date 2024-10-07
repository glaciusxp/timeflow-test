import {User} from '../models/user.model';
import {SupplierReview} from '../models/review.model';

export const mockUsers: Array<User> = [
  {
    id: '1',
    fullName: 'Rossi Mario',
    username: 'rossi.mario',
    email: 'mario.rossi@example.com',
    userType: 'customer'
  },
  {
    id: '2',
    fullName: 'Bianchi Luca',
    username: 'bianchi.luca',
    email: 'luca.bianchi@example.com',
    userType: 'supplier'
  },
  {
    id: '3',
    fullName: 'Verdi Anna',
    username: 'verdi.anna',
    email: 'anna.verdi@example.com',
    userType: 'customer'
  },
  {
    id: '4',
    fullName: 'Neri Marco',
    username: 'neri.marco',
    email: 'marco.neri@example.com',
    userType: 'supplier'
  },
  {
    id: '5',
    fullName: 'Gialli Sara',
    username: 'gialli.sara',
    email: 'sara.gialli@example.com',
    userType: 'customer'
  },
  {
    id: '6',
    fullName: 'Ferri Giovanni',
    username: 'ferri.giovanni',
    email: 'giovanni.ferri@example.com',
    userType: 'supplier'
  },
  {
    id: '7',
    fullName: 'Grassi Elena',
    username: 'grassi.elena',
    email: 'elena.grassi@example.com',
    userType: 'customer'
  },
  {
    id: '8',
    fullName: 'Fonti Paolo',
    username: 'fonti.paolo',
    email: 'paolo.fonti@example.com',
    userType: 'supplier'
  },
  {
    id: '9',
    fullName: 'Conti Chiara',
    username: 'conti.chiara',
    email: 'chiara.conti@example.com',
    userType: 'customer'
  },
  {
    id: '10',
    fullName: 'Martini Luca',
    username: 'martini.luca',
    email: 'luca.martini@example.com',
    userType: 'supplier'
  },
  {
    id: '11',
    fullName: 'Gallo Francesca',
    username: 'gallo.francesca',
    email: 'francesca.gallo@example.com',
    userType: 'customer'
  },
  {
    id: '12',
    fullName: 'Ruggeri Simone',
    username: 'ruggeri.simone',
    email: 'simone.ruggeri@example.com',
    userType: 'supplier'
  },
  {
    id: '13',
    fullName: 'Pellegrini Laura',
    username: 'pellegrini.laura',
    email: 'laura.pellegrini@example.com',
    userType: 'customer'
  },
  {
    id: '14',
    fullName: 'Sartori Andrea',
    username: 'sartori.andrea',
    email: 'andrea.sartori@example.com',
    userType: 'supplier'
  },
  {
    id: '15',
    fullName: 'Rinaldi Claudia',
    username: 'rinaldi.claudia',
    email: 'claudia.rinaldi@example.com',
    userType: 'customer'
  },
  {
    id: '16',
    fullName: 'Morandi Stefano',
    username: 'morandi.stefano',
    email: 'stefano.morandi@example.com',
    userType: 'supplier'
  },
  {
    id: '17',
    fullName: 'Longo Maria',
    username: 'longo.maria',
    email: 'maria.longo@example.com',
    userType: 'customer'
  },
  {
    id: '18',
    fullName: 'Rizzo Matteo',
    username: 'rizzo.matteo',
    email: 'matteo.rizzo@example.com',
    userType: 'supplier'
  },
  {
    id: '19',
    fullName: 'Ferrari Giulia',
    username: 'ferrari.giulia',
    email: 'giulia.ferrari@example.com',
    userType: 'customer'
  },
  {
    id: '20',
    fullName: 'Cattaneo Alberto',
    username: 'cattaneo.alberto',
    email: 'alberto.cattaneo@example.com',
    userType: 'supplier'
  }
];

export const mockSuppliers: Array<SupplierReview> = [
  {
    id: '1',
    fullName: 'Azienda Uno Srl',
    username: 'azienda.uno',
    email: 'info@aziendauno.com',
    reviews: [
      {
        rating: 4,
        info: 'Servizio molto buono e rapido.',
        user: 'Rossi Mario',
        email: 'mario.rossi@example.com',
        insertDate: '2023-10-01T10:30:00Z'
      },
      {
        rating: 5,
        info: 'Eccellente qualità dei prodotti.',
        user: 'Verdi Anna',
        email: 'anna.verdi@example.com',
        insertDate: '2023-10-02T11:00:00Z'
      }
    ]
  },
  {
    id: '2',
    fullName: 'Azienda Due Srl',
    username: 'azienda.due',
    email: 'info@aziendadue.com',
    reviews: [
      {
        rating: 3,
        info: 'Servizio nella media, nulla di speciale.',
        user: 'Bianchi Chiara',
        email: 'chiara.bianchi@example.com',
        insertDate: '2023-10-03T12:15:00Z'
      },
      {
        rating: 4,
        info: 'Buon supporto clienti.',
        user: 'Fonti Paolo',
        email: 'paolo.fonti@example.com',
        insertDate: '2023-10-04T09:45:00Z'
      },
      {
        rating: 2,
        info: 'Ho avuto problemi con la consegna.',
        user: 'Grassi Elena',
        email: 'elena.grassi@example.com',
        insertDate: '2023-10-05T08:00:00Z'
      }
    ]
  },
  {
    id: '3',
    fullName: 'Azienda Tre Srl',
    username: 'azienda.tre',
    email: 'info@aziendatre.com',
    reviews: [
      {
        rating: 5,
        info: 'Ottimo fornitore, consiglio vivamente.',
        user: 'Gialli Simone',
        email: 'simone.gialli@example.com',
        insertDate: '2023-10-06T14:30:00Z'
      },
      {
        rating: 4,
        info: 'Esperienza positiva, tornerò.',
        user: 'Martini Giulia',
        email: 'giulia.martini@example.com',
        insertDate: '2023-10-07T15:00:00Z'
      },
      {
        rating: 5,
        info: 'Prodotti di alta qualità.',
        user: 'Conti Andrea',
        email: 'andrea.conti@example.com',
        insertDate: '2023-10-08T16:00:00Z'
      },
      {
        rating: 3,
        info: 'Servizio buono, ma ci possono essere miglioramenti.',
        user: 'Rinaldi Claudia',
        email: 'claudia.rinaldi@example.com',
        insertDate: '2023-10-09T17:15:00Z'
      }
    ]
  },
  {
    id: '4',
    fullName: 'Azienda Quattro Srl',
    username: 'azienda.quattro',
    email: 'info@aziendaquattro.com',
    reviews: [
      {
        rating: 1,
        info: 'Pessima esperienza, non consiglio.',
        user: 'Rizzo Matteo',
        email: 'matteo.rizzo@example.com',
        insertDate: '2023-10-10T18:00:00Z'
      },
      {
        rating: 2,
        info: 'Ho riscontrato diversi problemi.',
        user: 'Sartori Anna',
        email: 'anna.sartori@example.com',
        insertDate: '2023-10-11T19:00:00Z'
      },
      {
        rating: 5,
        info: 'Servizio impeccabile, tutto perfetto.',
        user: 'Ferrari Giulia',
        email: 'giulia.ferrari@example.com',
        insertDate: '2023-10-12T20:00:00Z'
      }
    ]
  },
  {
    id: '5',
    fullName: 'Azienda Cinque Srl',
    username: 'azienda.cinque',
    email: 'info@aziendacinque.com',
    reviews: [
      {
        rating: 4,
        info: 'Soddisfatto, tornerò sicuramente.',
        user: 'Cattaneo Alberto',
        email: 'alberto.cattaneo@example.com',
        insertDate: '2023-10-13T21:00:00Z'
      },
      {
        rating: 4,
        info: 'Buon servizio e qualità.',
        user: 'Longo Maria',
        email: 'maria.longo@example.com',
        insertDate: '2023-10-14T22:00:00Z'
      },
      {
        rating: 3,
        info: 'Nessun problema, ma non eccezionale.',
        user: 'Grassi Elena',
        email: 'elena.grassi@example.com',
        insertDate: '2023-10-15T23:00:00Z'
      },
      {
        rating: 5,
        info: 'Tutto perfetto, lo consiglio.',
        user: 'Morandi Stefano',
        email: 'stefano.morandi@example.com',
        insertDate: '2023-10-16T12:00:00Z'
      }
    ]
  },
  {
    id: '6',
    fullName: 'Azienda Sei Srl',
    username: 'azienda.sei',
    email: 'info@aziendasei.com',
    reviews: [
      {
        rating: 2,
        info: 'Servizio lento e poco professionale.',
        user: 'Bianchi Luca',
        email: 'luca.bianchi@example.com',
        insertDate: '2023-10-17T10:00:00Z'
      },
      {
        rating: 3,
        info: 'Sufficiente, ma ci sono margini di miglioramento.',
        user: 'Neri Sara',
        email: 'sara.neri@example.com',
        insertDate: '2023-10-18T11:00:00Z'
      }
    ]
  },
  {
    id: '7',
    fullName: 'Azienda Sette Srl',
    username: 'azienda.sette',
    email: 'info@aziendasette.com',
    reviews: [
      {
        rating: 5,
        info: 'Assolutamente fantastico!',
        user: 'Ruggeri Marco',
        email: 'marco.ruggeri@example.com',
        insertDate: '2023-10-19T14:00:00Z'
      },
      {
        rating: 4,
        info: 'Mi sono trovato molto bene.',
        user: 'Gialli Chiara',
        email: 'chiara.gialli@example.com',
        insertDate: '2023-10-20T15:00:00Z'
      },
      {
        rating: 3,
        info: 'Esperienza nella media.',
        user: 'Conti Paolo',
        email: 'paolo.conti@example.com',
        insertDate: '2023-10-21T16:00:00Z'
      }
    ]
  },
  {
    id: '8',
    fullName: 'Azienda Otto Srl',
    username: 'azienda.otto',
    email: 'info@aziendaotto.com',
    reviews: [
      {
        rating: 1,
        info: 'Non consiglio questo fornitore.',
        user: 'Rizzo Matteo',
        email: 'matteo.rizzo@example.com',
        insertDate: '2023-10-22T18:30:00Z'
      },
      {
        rating: 2,
        info: 'Servizio scadente e poco professionale.',
        user: 'Morandi Stefano',
        email: 'stefano.morandi@example.com',
        insertDate: '2023-10-23T19:00:00Z'
      },
      {
        rating: 3,
        info: 'Nella media, ma ci sono fornitore migliori.',
        user: 'Martini Giulia',
        email: 'giulia.martini@example.com',
        insertDate: '2023-10-24T20:00:00Z'
      }
    ]
  },
  {
    id: '9',
    fullName: 'Azienda Nove Srl',
    username: 'azienda.nove',
    email: 'info@aziendanove.com',
    reviews: [
      {
        rating: 5,
        info: 'Servizio ottimo e tempi di consegna rapidi.',
        user: 'Bianchi Chiara',
        email: 'chiara.bianchi@example.com',
        insertDate: '2023-10-25T12:00:00Z'
      },
      {
        rating: 4,
        info: 'Molto soddisfatto dei prodotti.',
        user: 'Neri Luca',
        email: 'luca.neri@example.com',
        insertDate: '2023-10-26T13:00:00Z'
      },
      {
        rating: 5,
        info: 'Eccellente in tutto!',
        user: 'Verdi Anna',
        email: 'anna.verdi@example.com',
        insertDate: '2023-10-27T14:00:00Z'
      }
    ]
  },
  {
    id: '10',
    fullName: 'Azienda Dieci Srl',
    username: 'azienda.dieci',
    email: 'info@aziendadieci.com',
    reviews: [
      {
        rating: 3,
        info: 'Sufficiente, ma ci sono margini di miglioramento.',
        user: 'Longo Maria',
        email: 'maria.longo@example.com',
        insertDate: '2023-10-28T15:00:00Z'
      },
      {
        rating: 2,
        info: 'Non sono rimasto soddisfatto.',
        user: 'Cattaneo Alberto',
        email: 'alberto.cattaneo@example.com',
        insertDate: '2023-10-29T16:00:00Z'
      }
    ]
  }
];
