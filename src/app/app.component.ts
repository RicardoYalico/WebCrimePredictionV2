import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';
import {MapDataService} from "../services/map-data.service";
import {ReportsService} from "../services/reports.service";
import {HttpClientModule} from "@angular/common/http";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { Loader } from "@googlemaps/js-api-loader"
import {ChildComponent} from "./child/child.component";
import {ParentComponent} from "./parent/parent.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotImageDirective} from "../shared/directives/not-image.directive";
import {DemoComponent} from "./demo/demo.component";
import {MapComponent} from "./map/map.component";
import {StreetViewService} from "../core/services/street-view.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgOptimizedImage, NgForOf, PowerBIEmbedModule, ChildComponent, ParentComponent, NgIf, NgClass, DatePipe, FormsModule, ReactiveFormsModule, NotImageDirective, DemoComponent, MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MapDataService, ReportsService, StreetViewService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
  }

}
