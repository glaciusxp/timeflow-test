import { Component, OnInit } from '@angular/core';
import {MockApiService} from '../../services/mock-api.service';
import {Review, SupplierReview} from '../../models/review.model';
import {MatDialog} from '@angular/material/dialog';
import {ReviewCrudDialogComponent} from '../review-crud-dialog/review-crud-dialog.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  suppliers: Array<SupplierReview> = [];

  selectedSupplier: SupplierReview = null;

  reviews: Array<Review> = [];
  value = 3;

  constructor(private api: MockApiService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this._loadSuppliers()
      .then(() => {
        if (this.selectedSupplier != null) {
          this._loadReviews();
        }
      });
  }

  // Selezione Fornitore
  onSelectSupplier(supplierId: string): void {
    this.selectedSupplier = this.suppliers.find((s) => s.id === supplierId);
    this._loadReviews();
  }

  // Apertura dialog inserimento recensione
  onNewReview(): void {
    const dialogRef = this.dialog.open(ReviewCrudDialogComponent, {
      width: '40rem',
      data: this.selectedSupplier
    });

    dialogRef.afterClosed().subscribe((isOk: boolean) => {
      if (isOk) {
        // Ricarico recensioni se la recensioni è stata inserita correttamente.
        this._loadReviews();
      }
    });
  }

  // Caricamento lista fornitori
  private async _loadSuppliers(): Promise<void> {
    return await this.api.getSuppliers()
      .then((suppliers) => {
        this.suppliers = suppliers;
        console.log('Suppliers=', suppliers);
        if (this.suppliers != null && this.suppliers.length > 0) {
          this.selectedSupplier = this.suppliers[0];
        }
        return Promise.resolve();
      });
  }

  // Caricamento Recensioni del fornitore selezionato
  private _loadReviews(): void {
    this.api.getReviews(this.selectedSupplier.id)
      .then((reviews) => {
        this.reviews = reviews;
        this.calculateSupplierRating();
      });
  }

  // Calcolo punteggio medio del fornitore in base alle recensioni ottenute.
  private calculateSupplierRating(): void {
    let rating = 0;
    this.reviews.forEach((review) => {
      rating += review.rating;
    });
    if (this.reviews.length > 0) {
      this.selectedSupplier.rating = Math.round((rating / this.reviews.length) * 10) / 10;
    }
  }
}
