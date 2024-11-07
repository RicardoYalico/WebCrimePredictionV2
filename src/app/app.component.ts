import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_building_blocks/place_directions_button.js';
import {MapDataService} from "./core/services/map-data.service";
import {ReportsService} from "./core/services/reports.service";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { Loader } from "@googlemaps/js-api-loader"
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NotImageDirective} from "./shared/directives/not-image.directive";
import {MapComponent} from "./features/map/map.component";
import {StreetViewService} from "./core/services/street-view.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgOptimizedImage, NgForOf, PowerBIEmbedModule, NgIf, NgClass, DatePipe, FormsModule, ReactiveFormsModule, NotImageDirective, MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MapDataService, ReportsService, StreetViewService, StreetViewService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  feedbackFormGroup: FormGroup;
  emailPattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,63}';

  constructor(private http: HttpClient) {
    this.feedbackFormGroup  = new FormGroup({
      feedbackEmail: new FormControl('', Validators.compose( [Validators.required,Validators.pattern(this.emailPattern)])),
      emailDescription: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.feedbackFormGroup.valid) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xovazbvy',
        {replyto: this.feedbackFormGroup.get('feedbackEmail')?.value, message: this.feedbackFormGroup.get('emailDescription')?.value },
        { 'headers': headers }).subscribe(
            (response: any) => {
              Swal.fire({
                title: "Correo enviado",
                text: "El correo ha sido enviado correctamente",
                icon: "success"
              }).then();
              this.feedbackFormGroup.reset()
        }, error => {
          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al enviar el correo",
            icon: "error"
          }).then();
          this.feedbackFormGroup.reset()
        }
      );
    }
  }
}
