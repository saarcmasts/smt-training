import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// import { TextField } from "../../components/form/text-field/text-field";
import { Button } from "../../components/button/button";
import { RouterModule } from '@angular/router';
import { Inject } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;
  private authservice = inject(AuthService);
  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('email', [Validators.required, Validators.email]),
      password: new FormControl('password', [Validators.required])
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const response = await fetch("http://localhost:3000/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginId: email, password })
      });
      const data = await response.json();
      localStorage.setItem('auth_token', data.token);
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Form is invalid');
    }
  }

  onForgotPassword() {
    this.authservice.forgotPassword(this.loginForm.value.email).subscribe((res: unknown) => {
      console.log(res);
    });
  }

}
