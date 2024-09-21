import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews/reviews.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ReviewsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ReviewsModule { }
