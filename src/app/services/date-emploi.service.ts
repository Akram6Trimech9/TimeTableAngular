import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../ts/enum';  

@Injectable({
  providedIn: 'root'
})
export class EmploiDateService {

  constructor(private _http: HttpClient) { }

   getAllEmploiDates(): Observable<any> {
    return this._http.get<any>(ApiRoutes.dateEmploi);
  }

   getEmploiDateById(id: string): Observable<any> {
    return this._http.get<any>(`${ApiRoutes.dateEmploi}/${id}`);
  }

   addEmploiDate(emploiDate: any): Observable<any> {
    return this._http.post<any>(ApiRoutes.dateEmploi, emploiDate);
  }

   updateEmploiDate(id: string, emploiDate: any): Observable<any> {
    return this._http.put<any>(`${ApiRoutes.dateEmploi}/${id}`, emploiDate);
  }

   deleteEmploiDate(id: string): Observable<any> {
    return this._http.delete<any>(`${ApiRoutes.dateEmploi}/${id}`);
  }
}
