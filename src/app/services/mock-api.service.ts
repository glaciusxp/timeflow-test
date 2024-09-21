import { Injectable } from '@angular/core';
import {LoginModel} from '../models/login.model';
import {SignUpModel} from '../models/sign-up.model';
import {StorageValues} from '../utils/storage.enum';
import {JSONSchemaArray, LocalStorage, StorageMap} from '@ngx-pwa/local-storage';
import {mockSuppliers, mockUsers} from './mock-data';
import {User} from '../models/user.model';
import {Review, SupplierReview} from '../models/review.model';
import {JSONSchemaObject} from '@ngx-pwa/local-storage/lib/validation/json-schema';
import {IdLabelModel} from '../models/id-label.model';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor(private storage: StorageMap,
              private localStorage: LocalStorage) { }

  async init(): Promise<void> {

    const isInitialized = await this.storage.has(StorageValues.timeFlowInit).toPromise();
    if (!isInitialized) {
      this.storage.set(StorageValues.timeFlowInit, new Date().toISOString())
        .toPromise().then(() => {});
      this.storage.set(StorageValues.users, mockUsers)
        .toPromise().then(() => {});
      this.storage.set(StorageValues.suppliers, mockSuppliers)
        .toPromise().then(() => {});
    }
    return;
  }

  getUserTypes(): Array<IdLabelModel> {
    return [
      { id: 'client', label: 'Client' },
      { id: 'supplier', label: 'Supplier' }
    ];
  }

  async submitLogin(form: LoginModel): Promise<boolean> {
    await this.localStorage.setItem(StorageValues.jwtToken, 'fakeToken').toPromise();
    await this.localStorage.setItem(StorageValues.username, form.username).toPromise();
    return true;
  }

  async submitRegister(form: SignUpModel): Promise<boolean> {

    localStorage.setItem(StorageValues.jwtToken, 'fakeToken');
    localStorage.setItem(StorageValues.username, form.username);

    return true;
  }

  async getUsers(): Promise<Array<User>> {
    return this.storage.get<Array<User>>(StorageValues.users, DbSchemas.usersSchema).toPromise();
  }

  async postInsertUser(user: User): Promise<void> {
    user.id = btoa(user.username);
    const users = await this.getUsers();
    users.push(user);
    return await this.updateUsersDb(users);
  }

  async putUpdateUser(user: User): Promise<boolean> {
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users[index] = user;
      await this.updateUsersDb(users);
      return true;
    }
    return false;
  }

  async deleteUser(user: User): Promise<boolean> {
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      users.splice(index, 1);
      await this.updateUsersDb(users);
      return true;
    }
    return false;
  }

  async getSuppliers(loadAll: boolean = false): Promise<Array<SupplierReview>> {
    const suppliers = await this.storage.get<Array<SupplierReview>>(StorageValues.suppliers, DbSchemas.suppliersSchema).toPromise();
    // Nonostante il mock abbia già le recensioni per ogni fornitore,
    // le rimuovo, simulando come fossero da estrarre in secondo momento
    if (!loadAll) {
      return suppliers.map((s) => s.reviews = undefined);
    } else {
      return suppliers;
    }
  }

  async getReviews(supplierId: string): Promise<Array<Review>> {
    const suppliers = await this.storage.get<Array<SupplierReview>>(StorageValues.suppliers, DbSchemas.suppliersSchema).toPromise();
    const supplier = suppliers.find((s) => s.id === supplierId);
    if (supplier != null) {
      return supplier.reviews;
    }
    return new Array<Review>();
  }

  async postInsertReview(supplierId: string, review: Review): Promise<boolean> {
    const suppliers = await this.getSuppliers(true);
    const index = suppliers.findIndex((supplier) => supplier.id === supplierId);
    if (index > -1) {
      suppliers[index].reviews.push(review);
      await this.updateSuppliersDb(suppliers);
      return true;
    }
    return false;
  }

  private async updateUsersDb(users: Array<User>): Promise<void> {
    return this.storage.set(StorageValues.users, users).toPromise();
  }

  private async updateSuppliersDb(suppliers: Array<SupplierReview>): Promise<void> {
    return this.storage.set(StorageValues.suppliers, suppliers).toPromise();
  }
}

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
