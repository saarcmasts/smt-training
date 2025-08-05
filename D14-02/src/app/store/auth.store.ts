import { computed, effect, signal } from '@angular/core';
import { Injectable } from '@angular/core';

export interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'auth_state';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  // Initialize state from localStorage or use default values
  private state = signal<AuthState>(this.loadState());

  // Selectors
  readonly email = computed(() => this.state().email);
  readonly password = computed(() => this.state().password);
  readonly isAuthenticated = computed(() => this.state().isAuthenticated);

  constructor() {
    // Effect to persist state changes to localStorage
    effect(() => {
      const currentState = this.state();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    });
  }

  // Actions
  login(data:any) {
    
    this.state.set({
      email: data.email,
      password: data.password,
      isAuthenticated: true
    });
  }

  logout() {
    this.state.set({
      email: '',
      password: '',
      isAuthenticated: false
    });
  }

  private loadState(): AuthState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      email: '',
      password: '',
      isAuthenticated: false
    };
  }
}
