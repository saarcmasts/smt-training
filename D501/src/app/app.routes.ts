import { Routes } from '@angular/router';
import {List} from './list/list';

export const routes: Routes = [{
    path: 'list',
    component: List
},{
    path: '',
    component: List
}];
