import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IReport} from "../../../interfaces/IReport";
import Swal from "sweetalert2";
import {ReportsService} from "../../../services/reports.service";
import {IIncidenceForm} from "../../../core/models/IIncidenceForm";

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
export class IncidenceFormComponent {

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
  }

  onSubmit(form: any) {
    console.log('Form send:', form.value);
    const report: IReport = {
      title: form.value.title,
      description: form.value.description,
      date: form.value.date,
      latitude: this.incidenceForm.latitude+"",
      longitude: this.incidenceForm.longitude+"",
      plus_code: this.incidenceForm.plus_code+"",
      distrito: this.incidenceForm.distrito+"",
    }
    this.reportsService.postReport(report).subscribe(
      res=> {
        Swal.fire({
          title: "Incidencia enviada",
          text: "La incidencia ha sido enviada correctamente",
          icon: "success"
        }).then();
        form.resetForm()
      }
    )
  }

  updateIIncidenceModalForm(incidenceModalForm: IIncidenceForm){
    this.incidenceForm = incidenceModalForm
  }

}
