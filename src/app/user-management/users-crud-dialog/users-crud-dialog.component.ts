@Component({
  selector: 'app-users-crud-dialog',
  templateUrl: './users-crud-dialog.component.html',
  styles: [``]
})
export class UsersCrud implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UsersCrud>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private api: MockApiService) {
  }

  ngOnInit() {
    if (this.data == null) {
      this.data = new User();
    }

    this.form = new FormGroup({
      id: new FormControl(this.data.id),
      userType: new FormControl(this.data.userType, [Validators.required]),
      username: new FormControl(this.data.username, [Validators.required]),
      fullName: new FormControl(this.data.fullName, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required])
    });
  }

  onSubmit(): void {
    if (!this.form.valid) { return; }

    if (this.form.value.id == null) {
      this.api.postInsertUser(this.form.value)
        .then(() => {
          this.dialogRef.close(true);
        });
    } else {
      this.api.putUpdateUser(this.form.value)
        .then((response) => {
          this.dialogRef.close(response);
        });
    }

  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
