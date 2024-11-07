// map-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IReport} from "../interfaces/IReport";

@Injectable()
export class ReportsService {

  private apiUrl = 'https://8yi27bsvt0.execute-api.us-east-1.amazonaws.com/dev';
  private headers = {"Content-Type": "application/json"};


  constructor(private http: HttpClient) { }

  getAllReports(): Observable<any> {
    return this.http.get(this.apiUrl, {headers: this.headers});
  }

  postReport(data: IReport){
    return this.http.post(this.apiUrl, JSON.stringify(data), {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }
}
