import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const RATING_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => ReviewStarsComponent)
};

@Component({
  selector: 'review-stars',
  template: `
    <div class="review-stars"
         [ngClass]="{'invalid': !readonly && (value < 1 || value > 5)}"
    >
      <div class="review-rating">
        <ng-container *ngFor="let star of stars">
          <img src="/assets/images/star_unchecked.svg"
               alt="checked"
               class="review-star unchecked-star"
               [ngClass]="{'clickable': !readonly}"
               *ngIf="value < star && value <= (star - 1)"
               (click)="onClickStar(star)"
          />
          <img src="/assets/images/star_checked.svg"
               alt="unchecked"
               class="review-star checked-star"
               [ngClass]="{'clickable': !readonly}"
               *ngIf="value >= star"
               (click)="onClickStar(star)"
          />
          <img src="/assets/images/half_star.svg"
               alt="half checked"
               class="review-star half-checked-star"
               [ngClass]="{'clickable': !readonly}"
               *ngIf="value < star && value > (star - 1)"
               (click)="onClickStar(star)"
          />
        </ng-container>
      </div>
      <span class="star-rating">
        {{ value }}/{{stars.length}}
      </span>
    </div>
  `,
  styles: [`
    .review-stars {
      display: flex;
      gap: 5px;
      align-items: center;
    }

    .review-rating {
      display: flex;
    }

    .review-stars.invalid .review-rating {
      border: 1px solid red;
    }

    .review-star {
      flex: 0 0 auto;
      transition: all .1s linear;
    }

    .review-star.clickable:hover {
      transform: scale(1.3);
    }

    .star-rating {
      margin-left: 10px;
      font-weight: bold;
      font-size: .8rem;
    }

    .clickable {
      cursor: pointer;
    }
  `],
  providers: [RATING_CONTROL_VALUE_ACCESSOR]
})
export class ReviewStarsComponent implements OnInit, ControlValueAccessor {

  readonly stars = [1, 2, 3, 4, 5];

  @Input() value = 0;

  @Input() readonly = false;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange = (_: number) => {};

  onTouched = () => {};

  onClickStar(value: number): void {
    if (this.readonly) {
      return;
    }

    this.value = value;
    this.valueChange.emit(value);

    this.writeValue(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(rating: number): void {
    this.onChange(rating);
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
