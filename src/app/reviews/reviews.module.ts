import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews/reviews.component';
import {AppCommonModule} from '../app-common/app-common.module';
import { ReviewCrudDialogComponent } from './review-crud-dialog/review-crud-dialog.component';

@NgModule({
  declarations: [ReviewsComponent, ReviewCrudDialogComponent],
  imports: [
    CommonModule,
    AppCommonModule
  ]
})
export class ReviewsModule { }
