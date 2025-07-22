import { Routes } from '@angular/router';
import { List } from './list/list';
import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo.component';

export const routes: Routes = [
  {
    path: 'list',
    component: List
  },
  {
    path: 'rxjs-demo',
    component: RxjsDemoComponent
  },
  {
    path: '',
    component: RxjsDemoComponent
  }
];
