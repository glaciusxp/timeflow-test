import { Injectable } from '@angular/core';
import {LoginModel} from '../models/login.model';
import {SignUpModel} from '../models/sign-up.model';
import {StorageValues} from '../utils/storage.enum';
import {JSONSchemaArray, StorageMap} from '@ngx-pwa/local-storage';
import {mockSuppliers, mockUsers} from './mock-data';
import {User} from '../models/user.model';
import {Review, SupplierReview} from '../models/review.model';
import {JSONSchemaObject} from '@ngx-pwa/local-storage/lib/validation/json-schema';
import {IdLabelModel} from '../models/id-label.model';
import {NotificationService} from './notification.service';
import {LoggedUserService} from './logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor(private storage: StorageMap,
              private notificationService: NotificationService,
              private loggedUserService: LoggedUserService,
  ) { }

  // Inizializzazione IndexedDB - simulazione di un database
  async init(): Promise<void> {

    const isInitialized = await this.storage.has(StorageValues.timeFlowInit).toPromise();

    if (!isInitialized) {
      await this.storage.set(StorageValues.timeFlowInit, new Date().toISOString()).toPromise();
      await this.setUsersData();
      await this.setSuppliers();
    }
    return;
  }

  // Lista del tipo utente, utilizzato nelle dropdown
  getUserTypes(): Array<IdLabelModel> {
    return [
      { id: 'customer', label: 'Customer' },
      { id: 'supplier', label: 'Supplier' }
    ];
  }

  // Metodo richiamato dalla rispettiva voce del menu utente per ripristinare i dati mockati originali
  restoreData(): void {
    Promise.all([
      this.setUsersData(),
      this.setSuppliers()
    ]).then(() => {
      location.reload();
    });
  }

  // Servizio di Login
  async submitLogin(form: LoginModel): Promise<boolean> {
    const users = await this.getUsers();
    const user = users.find((u) => u.username === form.username && u.userType === form.userType);
    console.log('submitLogin()', form, user, users);
    if (user != null) {
      localStorage.setItem(StorageValues.jwtToken, 'fakeToken');
      localStorage.setItem(StorageValues.userData, JSON.stringify(user));
      this.notificationService.notify(`Welcome back, ${user.fullName}`);
      return true;
    }
    return false;
  }

  // Servizio di Registrazione utente (la password non viene realmente salvata né gestita)
  async submitRegister(form: SignUpModel): Promise<boolean> {
    const user: User = new User();
    user.username = form.username;
    user.userType = form.userType;
    user.email = form.email;
    user.fullName =  form.username;
    user.id = btoa(user.username);
    const response = await this.postInsertUser(user);
    if (response) {
      localStorage.setItem(StorageValues.jwtToken, 'fakeToken');
      localStorage.setItem(StorageValues.userData, JSON.stringify(user));
      this.notificationService.notify(`Welcome, ${user.fullName}`);
    }
    return response;
  }

  // Restituisce la lista di tutti gli utenti
  async getUsers(): Promise<Array<User>> {
    return this.storage.get<Array<User>>(StorageValues.users, DbSchemas.usersSchema).toPromise();
  }

  // Salvataggio utente
  async postInsertUser(user: User): Promise<boolean> {
    user.id = btoa(user.username);
    const users = await this.getUsers();

    // Controllo se lo username o la mail non esistano già, altrimenti restituisco false
    const userCheck = users.filter((u) =>
      u.email.toLowerCase() === user.email.toLowerCase() ||
      u.username.toLowerCase() === user.username.toLowerCase()
    );
    if (userCheck.length === 0) {
      users.push(user);
      await this.updateUsersDb(users);

      this.notificationService.notify('User saved successfully!');
      return true;
    } else {
      return false;
    }
  }

  // Aggiornamento dati utente
  async putUpdateUser(user: User): Promise<boolean> {
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users[index] = user;
      await this.updateUsersDb(users);
      this.notificationService.notify('User updated successfully!');
      return true;
    }
    return false;
  }

  // Eliminazione utente
  async deleteUser(user: User): Promise<boolean> {
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users.splice(index, 1);
      await this.updateUsersDb(users);
      this.notificationService.notify('User deleted successfully!');
      return true;
    }
    return false;
  }

  // Restituisce la lista dei fornitori
  async getSuppliers(loadAll: boolean = false): Promise<Array<SupplierReview>> {
    const suppliers = await this.storage.get<Array<SupplierReview>>(StorageValues.suppliers, DbSchemas.suppliersSchema).toPromise();
    // Nonostante il mock abbia già le recensioni per ogni fornitore,
    // le rimuovo, simulando come fossero da estrarre in secondo momento con un altro servizio
    if (!loadAll) {
      return suppliers.map((s) => {
        s.reviews = undefined;
        return s;
      });
    } else {
      return suppliers;
    }
  }

  // Restituisce la lista delle recensioni di uno specifico fornitore
  async getReviews(supplierId: string): Promise<Array<Review>> {
    const suppliers = await this.storage.get<Array<SupplierReview>>(StorageValues.suppliers, DbSchemas.suppliersSchema).toPromise();
    const supplier = suppliers.find((s) => s.id === supplierId);
    if (supplier != null) {
      return supplier.reviews;
    }
    return new Array<Review>();
  }

  // Salvataggio nuova recensione
  async postInsertReview(supplierId: string, review: Review): Promise<boolean> {
    const suppliers = await this.getSuppliers(true);
    const index = suppliers.findIndex((supplier) => supplier.id === supplierId);
    if (index > -1) {
      // Imposto la data inserimento (che in teoria andrebbe settati lato backend)
      review.user = this.loggedUserService.user.fullName;
      review.email = this.loggedUserService.user.email;
      review.insertDate = new Date().toISOString();

      suppliers[index].reviews.push(review);
      await this.updateSuppliersDb(suppliers);
      this.notificationService.notify('Review inserted successfully!');
      return true;
    }
    return false;
  }

  // Salvataggio effettivo degli utenti nell'IndexedDB
  private async updateUsersDb(users: Array<User>): Promise<void> {
    return this.storage.set(StorageValues.users, users).toPromise();
  }

  // Salvataggio effettivo dei fornitori+recensioni nell'IndexedDB
  private async updateSuppliersDb(suppliers: Array<SupplierReview>): Promise<void> {
    return this.storage.set(StorageValues.suppliers, suppliers).toPromise();
  }

  // Inizializzazione dati utenti - salvataggio dati mockati
  private async setUsersData(): Promise<void> {
    return await this.storage.set(StorageValues.users, mockUsers).toPromise();
  }

  // Inizializzazione dati fornitori + recensioni - salvataggio dati mockati
  private async setSuppliers(): Promise<void> {
    return await this.storage.set(StorageValues.suppliers, mockSuppliers).toPromise();
  }
}

// Schema dei vari oggetti salvati nell'IndexedDB
export class DbSchemas {
  public static readonly userSchema: JSONSchemaObject = {
    type: 'object',
    properties: {
      id: {type: 'string'},
      username: {type: 'string'},
      email: {type: 'string'},
      userType: {type: 'string'},
      fullName: {type: 'string'},
    }
  };

  public static readonly usersSchema: JSONSchemaArray = {
    type: 'array',
    items: DbSchemas.userSchema
  };

  public static readonly reviewSchema: JSONSchemaObject = {
    type: 'object',
    properties: {
      rating: {type: 'number'},
      info: {type: 'string'},
      user: {type: 'string'},
      email: {type: 'string'},
      insertedDate: {type: 'string'}
    }
  };

  public static readonly reviewsSchema: JSONSchemaArray = {
    type: 'array',
    items: DbSchemas.reviewSchema
  };

  public static readonly supplierSchema: JSONSchemaObject = {
    type: 'object',
    properties: {
      id: {type: 'string'},
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      username: {type: 'string'},
      email: {type: 'string'},
      userType: {type: 'string'},
      reviews: DbSchemas.reviewsSchema
    }
  };

  public static readonly suppliersSchema: JSONSchemaArray = {
    type: 'array',
    items: DbSchemas.supplierSchema
  };
}
