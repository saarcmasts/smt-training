import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  password: string;
  token: string;  // if your API returns a token
}

export interface signUpRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface signUpResponse {
  email: string;
  firstname: string;
  lastname: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // replace with your actual API URL

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  signup(userData: signUpRequest): Observable<signUpResponse> {
    return this.http.post<signUpResponse>(`${this.apiUrl}/auth/signup`, userData);
  }

  dashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email });
  }
}
