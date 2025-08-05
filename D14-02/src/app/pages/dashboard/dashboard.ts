import { Component, signal, OnInit } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styles: [`
    .user-form {  padding: 20px; }
    .user-form input { width: 100%; margin-bottom: 10px; border: 1px solid #ccc; padding: 8px; }
    .user-form button { margin-top: 10px; border: 1px solid #007bff; background-color: #007bff; color: white; padding: 8px 16px; cursor: pointer; }
    .address input { width: 30%; margin: 10px; border: 1px solid #ccc; padding: 8px; }
  `]
})
export class DashboardComponent implements OnInit {
  userForm: FormGroup;
  constructor(public store: AuthStore, public route: ActivatedRoute, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: this.fb.array([this.createAddressGroup()])
    });

  }

  ngOnInit(): void {
    setTimeout(() => {
      let user_data = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: 1234567890,
        address: [{
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345'
        }, {
          street: '456 Elm St',
          city: 'Othertown',
          state: 'NY',
          zip: '67890'
        }]
      }
      this.userForm.patchValue(user_data);
    }, 4000);
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    });
  }

  addAddress() {
    (this.userForm.get('address') as FormArray).push(this.createAddressGroup());
  }

  getAddress() {
    return (this.userForm.get('address') as FormArray).controls;
  }
  onSubmit() {
    console.log('Form Submitted!', this.userForm.value);
  }

  logout() {
    this.store.logout();
  }
}
