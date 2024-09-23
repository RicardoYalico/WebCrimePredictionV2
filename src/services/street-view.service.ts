import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DigitalSignService} from "../shared/services/digital-sign.service";
import {IReport} from "../interfaces/IReport";
@Injectable({
  providedIn: 'root'
})
export class StreetViewService {

  clientSecret = 'Nx_5AvQ2oGqxR2ZaujcK_PFTRLE=';
  apiKey = 'AIzaSyDs8OTggHYGLRc_pJbUzN1NVSwjrOx9wYg';
  private headers = {"Content-Type": "application/json"};
  apiUrl = `https://s9hk4juha2.execute-api.us-east-1.amazonaws.com/dev/`

  constructor(private http: HttpClient, private digitalSignService:DigitalSignService) { }

  getImages(lat: any, lng: any): Observable<any> {
    let path = `${lat},${lng}&heading=360&fov=100&pitch=15&source=outdoor&key=${this.apiKey}`
    let signedUrl = this.digitalSignService.sign(this.apiUrl+path,this.clientSecret)
    console.log(signedUrl)
    return this.http.get('https://maps.googleapis.com/maps/api/streetview?size=640x640&location=-12.085,-77.10099999999997&heading=360&fov=100&pitch=15&source=outdoor&key=AIzaSyDs8OTggHYGLRc_pJbUzN1NVSwjrOx9wYg&signature=WlYCnXW5qdYJvf-ps6IqEP7MPZE=', {headers: this.headers});
  }


  getSignedUrl(lat: number, lng: number){
    return this.http.post(this.apiUrl, JSON.stringify({lat, lng}), {
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }
}
