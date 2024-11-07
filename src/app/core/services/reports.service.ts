// map-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IReport} from "../models/IReport";
import {environment} from "../../../environments/environment";

@Injectable()
export class ReportsService {

  private reports_apiUrl = environment.getReportsFunction;
  private headers = {"Content-Type": "application/json"};


  constructor(private http: HttpClient) { }

  getAllReports(): Observable<any> {
    return this.http.get(this.reports_apiUrl, {headers: this.headers});
  }

  postReport(data: IReport){
    return this.http.post(this.reports_apiUrl, JSON.stringify(data), {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }
}
