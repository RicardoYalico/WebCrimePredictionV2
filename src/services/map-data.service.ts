// map-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MapDataService {
  private headers = {"Content-Type": "application/json"};

  private crime_apiUrl = 'https://lg8hjv4o1c.execute-api.us-east-1.amazonaws.com/dev';
  private prediction_apiUrl = 'https://7k1nhkx21d.execute-api.us-east-1.amazonaws.com/dev/'
  constructor(private http: HttpClient) { }

  getAllCrimes(): Observable<any> {
    return this.http.get(this.crime_apiUrl, {headers: this.headers});
  }

  getPredictionCoordinates(): Observable<any> {
    return this.http.get(this.prediction_apiUrl, {headers: this.headers});
  }

  getPlusCode(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any[]>(`https://plus.codes/api?address=${latitude},${longitude}&email=u201920140@upc.edu.pe`);
  }

}
