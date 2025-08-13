import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard]
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
    }
];
