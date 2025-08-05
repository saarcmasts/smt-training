import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TextField } from "../../components/form/text-field/text-field";
import { Button } from "../../components/button/button";
import { AuthStore } from '../../store/auth.store';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TextField, Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authStore: AuthStore,
    private router: Router, private authService: AuthService
  ) {
    // Redirect if already logged in
    if (this.authStore.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ email, password }).subscribe((res) => {
        let data = res;
        this.authStore.login(data);
        this.router.navigate(['/dashboard']);
      });
    } else {
      window.alert('Please fill in all fields correctly.');
    }
  }
}
