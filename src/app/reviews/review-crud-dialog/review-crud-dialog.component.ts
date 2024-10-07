import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SupplierReview} from '../../models/review.model';
import {MockApiService} from '../../services/mock-api.service';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {FormGenerator} from '../../authentication/utils/form-generator';

@Component({
  selector: 'app-review-crud-dialog',
  template: `
    <h2 mat-dialog-title>
      <ng-template [ngIf]="supplier != null">
        Insert review for <strong>{{supplier.fullName}}</strong>
      </ng-template>
    </h2>
    <mat-dialog-content class="review-crud-form-dialog">
      <form id="reviewCrud"
            class="review-crud-form"
            *ngIf="reviewForm != null"
            [formGroup]="reviewForm"
            (submit)="onSubmit()"
      >
        <review-stars class="review-rating"
                      formControlName="rating"
        ></review-stars>
        <mat-form-field appearance="fill">
          <mat-label>Review</mat-label>
          <textarea matInput formControlName="info"></textarea>
          <ng-template [ngIf]="reviewForm.hasError('error')">
            <mat-error>
              {{ reviewForm.getError('error') }}
            </mat-error>
          </ng-template>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button
              (click)="onClose()">
        Cancel
      </button>
      <button mat-button
              color="primary"
              type="submit"
              form="reviewCrud"
              [disabled]="reviewForm.invalid"
      >
        Save
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .review-crud-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .review-rating {
      margin: 0 auto;
    }
  `]
})
export class ReviewCrudDialogComponent implements OnInit {

  reviewForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ReviewCrudDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public supplier: SupplierReview,
              private api: MockApiService
              ) { }

  ngOnInit(): void {
    this.reviewForm = FormGenerator.buildReviewForm();
  }

  onSubmit(): void {
    if (!this.reviewForm.valid) { return; }

    this.api.postInsertReview(this.supplier.id, this.reviewForm.value)
      .then((isOk) => {
        if (isOk) {
          this.dialogRef.close(true);
        } else {
          const error: ValidationErrors = { error: 'An error occurred. Please try again.'};
          this.reviewForm.get('info').setErrors(error);
          this.reviewForm.setErrors(error);
        }
      });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
