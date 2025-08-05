import { Component } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      
      @if (store.isAuthenticated()) {
        <div class="bg-white p-4 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">User Information</h2>
          <p><strong>Email:</strong> {{ store.email() }}</p>
          <p><strong>Password:</strong> {{ store.password() }}</p>
          
          <button 
            (click)="logout()"
            class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      } @else {
        <p>Please login to view this page</p>
      }
    </div>
  `
})
export class DashboardComponent {
  constructor(public store: AuthStore) {}

  logout() {
    this.store.logout();
  }
}
