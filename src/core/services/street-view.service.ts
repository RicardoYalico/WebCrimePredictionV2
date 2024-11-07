import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class StreetViewService {
  apiUrl = `https://s9hk4juha2.execute-api.us-east-1.amazonaws.com/dev/`

  constructor(private http: HttpClient) { }

  getSignedUrl(lat: number, lng: number, formatted_address: any): Observable<any>{
    return this.http.post(this.apiUrl, JSON.stringify({lat, lng, formatted_address}), {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
}



}
