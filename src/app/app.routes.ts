import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {DemoComponent} from "./demo/demo.component";
import {MapComponent} from "./map/map.component";

export const routes: Routes = [
  // { path: '/aws', component: AppComponent }
  { path: '', component:MapComponent}
];
