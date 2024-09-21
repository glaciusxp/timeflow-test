export class SupplierReview {
  id: string;
  fullName: string;
  username: string;
  email: string;
  reviews: Array<Review>;
}

export class Review {
  rating: number;
  info: string;
  user: string;
  email: string;
  insertDate: string;
}
