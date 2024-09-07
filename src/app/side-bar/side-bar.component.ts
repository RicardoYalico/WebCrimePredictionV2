import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {IncidenceFormComponent} from "../../shared/components/incidence-form/incidence-form.component";
import {NotImageDirective} from "../../shared/directives/not-image.directive";
import {IIncidenceForm} from "../../core/models/IIncidenceForm";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    DatePipe,
    IncidenceFormComponent,
    NotImageDirective,
    NgForOf,
    NgIf
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit, OnChanges{
  @ViewChild('IncidenceModalForm') IncidenceModalForm!: IncidenceFormComponent;
  hiddenLeftPanel: boolean = false;
  loading: boolean = true;
  formated_address: string = '';
  @Input() crimesToShow: any[] = []
  @Input() reportsToShow: any[] = []
  @Input() incidenceForm: IIncidenceForm = {
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    plus_code: '',
    date: '',
    distrito: ''
  };
  bootstrap: any

  constructor() {
  }


  openFormReportModal() {
    this.IncidenceModalForm.updateIIncidenceModalForm(this.incidenceForm)
    const modalElement = document.getElementById('incidenceModalForm');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this.formated_address = ''
    let geocoder = new google.maps.Geocoder();
    // let placesService = new google.maps.places.PlacesService(map);

    geocoder.geocode(
      {
        'location': {lat: Number(this.incidenceForm.latitude), lng: Number(this.incidenceForm.longitude)},
        // 'extraComputations': ['ADDRESS_DESCRIPTORS'],
      }
    ).then((res: any) => {

      console.log(res)
      this.formated_address = res.results[0].formatted_address;
      this.loading = false;
      // this.currently_address = {
      //   address: res.results[0].formatted_address,
      // };
      let request = {
        placeId: res.results[0].place_id,
        fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'photo']
      };

      // placesService.getDetails(request, (response: any) => {
      //   let img = (<HTMLImageElement>document.getElementById('photo'))
      //
      //   img.setAttribute("src", response.photos[0].getUrl())
      // })

      // window.document.getElementById("address")!.innerHTML = res.results[0].formatted_address;
      // window.document.getElementById("latLng")!.innerHTML = mapsMouseEvent.latLng;
    })
  }



}

