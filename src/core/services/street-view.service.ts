import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from "rxjs";
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class StreetViewService {
  clientSecret = 'Nx_5AvQ2oGqxR2ZaujcK_PFTRLE=';
  apiKey = 'AIzaSyDs8OTggHYGLRc_pJbUzN1NVSwjrOx9wYg';
  private apiUrl = 'https://maps.googleapis.com/maps/api/streetview?';
  private headers = {"Content-Type": "application/json"};
  constructor(private http: HttpClient) { }

  decodeBase64Hash(code: any) {
    return atob(code); // Decodifica una cadena en base64
  }

  removeWebSafe(safeEncodedString: string) {
    return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/');
  }
  makeWebSafe(encodedString: string) {
    return encodedString.replace(/\+/g, '-').replace(/\//g, '_');
  }
  encodeBase64Hash(key: string, data: string) {
    const hmac = CryptoJS.HmacSHA1(data, key);
    return CryptoJS.enc.Base64.stringify(hmac);
  }
  sign(path: string, secret: string) {
    const uri = new URL(path);
    const safeSecret = this.decodeBase64Hash(this.removeWebSafe(secret));
    const hashedSignature = this.makeWebSafe(this.encodeBase64Hash(safeSecret, uri.pathname));
    uri.searchParams.append('signature', hashedSignature);
    return uri.toString();
  }

  getStreetViewImage(lat: string, lng: string, heading: number, fov: number, pitch: number, source: string): Observable<any> {
    let signedUrl = this.sign(`https://maps.googleapis.com/maps/api/streetview?size=640x640&location=${lat},${lng}&heading=${heading}&fov=${fov}&pitch=${pitch}&source=${source}&key=${this.apiKey}`, this.clientSecret)
    return this.http.get(signedUrl, {headers: this.headers});
  }

}
