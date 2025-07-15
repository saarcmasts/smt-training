import { Routes } from '@angular/router';

import { One } from './pages/one/one';
import { Two } from './pages/two/two';

export const routes: Routes = [
    {
        path: 'one',
        component: One,
    },
    {
        path: 'two',
        component: Two
    }
];
