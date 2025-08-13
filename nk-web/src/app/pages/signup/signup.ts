import { Component, inject } from '@angular/core';
import { TextField } from '../../components/form/text-field/text-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [TextField, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  signupForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      if (this.signupForm.value.password !== this.signupForm.value.confirmpassword) {
        console.error('Passwords do not match');
        return;
      }
      const formData = this.signupForm.value;
      formData.password = btoa(formData.password);
      this.authService.signup(formData).subscribe((res) => {
        console.log('Signup successful:', res);
        alert('Signup successful');
      });
      console.log('Form submitted successfully:', formData);
    } else {
      const errors = this.signupForm.errors;
      console.log(this.signupForm);
      if (errors) {
        console.error('Form is invalid:', errors);
      }
    }
  }
}
