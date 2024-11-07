import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IReport} from "../../../core/models/IReport";
import Swal from "sweetalert2";
import {ReportsService} from "../../../core/services/reports.service";
import {IIncidenceForm} from "../../../core/models/IIncidenceForm";
import * as report from "report";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-incidence-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './incidence-form.component.html',
  styleUrl: './incidence-form.component.css'
})
export class IncidenceFormComponent implements OnInit{
  @ViewChild('closeModal') closeModal!: ElementRef
  loading: boolean = false;
  incidenceFormGroup: FormGroup;
  bootstrap: any;
  incidenceForm: IIncidenceForm = {
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    plus_code: '',
    date: '',
    distrito: ''
  };

  constructor(private reportsService: ReportsService) {
    this.incidenceFormGroup  = new FormGroup({
      title: new FormControl(''),
      url: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      plus_code: new FormControl(''),
      distrito: new FormControl(''),
    });
  }

  onSubmit() {

    this.loading = true;
    const report: IReport = {
      title: this.incidenceFormGroup.get('title')?.value,
      description: this.incidenceFormGroup.get('description')?.value,
      date: this.incidenceFormGroup.get('date')?.value,
      latitude: this.incidenceFormGroup.get('latitude')?.value,
      longitude: this.incidenceFormGroup.get('longitude')?.value,
      plus_code: this.incidenceFormGroup.get('plus_code')?.value,
      distrito: this.incidenceFormGroup.get('distrito')?.value,
    }


    this.reportsService.postReport(report).subscribe(
      res=> {

        Swal.fire({
          title: "Incidencia enviada",
          text: "La incidencia ha sido enviada correctamente",
          icon: "success"
        }).then();
        this.incidenceFormGroup.reset()
        this.closeModal.nativeElement.click()
        this.refresh();
        this.loading = false;
      }, error => {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al enviar la incidencia",
          icon: "error"
        }).then();
      }

    )

  }

  updateIIncidenceModalForm(incidenceModalForm: IIncidenceForm){
    this.incidenceFormGroup.patchValue({
      latitude: incidenceModalForm.latitude,
      longitude: incidenceModalForm.longitude,
      plus_code: incidenceModalForm.plus_code,
      distrito: incidenceModalForm.distrito,
    })
  }

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
  }
}
