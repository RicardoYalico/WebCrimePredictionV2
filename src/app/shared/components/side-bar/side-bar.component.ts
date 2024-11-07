import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {IncidenceFormComponent} from "../incidence-form/incidence-form.component";
import {NotImageDirective} from "../../directives/not-image.directive";
import {IIncidenceForm} from "../../../core/models/IIncidenceForm";

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
  @Output() closeSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();
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

  ngOnChanges(): void {
    this.loading = true;
    this.formated_address = ''
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        'location': {lat: Number(this.incidenceForm.latitude), lng: Number(this.incidenceForm.longitude)},
      }
    ).then((res: any) => {
      this.formated_address = res.results[0].formatted_address;
      this.loading = false;
    })
  }

  sendCloseSideBar() {
    this.closeSideBar.emit(false);
  }
  protected readonly open = open;
}

