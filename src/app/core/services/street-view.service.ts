import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class StreetViewService {
  sign_apiUrl = environment.signServiceUrl;

  constructor(private http: HttpClient) { }

  getSignedUrl(lat: number, lng: number, formatted_address: any): Observable<any>{
    return this.http.post(this.sign_apiUrl, JSON.stringify({lat, lng, formatted_address}), {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
}



}
