import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  // { path: '/aws', component: AppComponent }
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: AppComponent },
];
