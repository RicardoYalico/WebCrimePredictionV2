import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IReport} from "../../../interfaces/IReport";
import Swal from "sweetalert2";
import {ReportsService} from "../../../services/reports.service";
import {IIncidenceForm} from "../../../core/models/IIncidenceForm";
import * as report from "report";

@Component({
  selector: 'app-incidence-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './incidence-form.component.html',
  styleUrl: './incidence-form.component.css'
})
export class IncidenceFormComponent implements OnInit{
  @ViewChild('closeModal') closeModal!: ElementRef
  // @ViewChild('incidenceFormControl') incidenceFormControl!: any;
  incidenceFormGroup: FormGroup;
  bootstrap: any;
  incidenceForm: IIncidenceForm = {
    title: '',
    description: '',
    url: '',
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


    const report: IReport = {
      title: this.incidenceFormGroup.get('title')?.value,
      description: this.incidenceFormGroup.get('description')?.value,
      url: this.incidenceFormGroup.get('url')?.value,
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

}
