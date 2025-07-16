import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Result } from './pages/result/result';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'result',
        component: Result
    }
];
