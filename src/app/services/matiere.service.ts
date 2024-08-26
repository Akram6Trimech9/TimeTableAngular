import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '../ts/enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private _http: HttpClient) { }

   getAllMatieres(): Observable<any> {
    return this._http.get<any>(ApiRoutes.matiere);
  }

   getMatiereById(id: any): Observable<any> {
    return this._http.get<any>(`${ApiRoutes.matiere}/${id}`);
  }

   addMatiere(Matiere: any): Observable<any> {
    return this._http.post<any>(ApiRoutes.matiere, Matiere);
  }

   updateMatiere(id: string, Matiere: any): Observable<any> {
    return this._http.put<any>(`${ApiRoutes.matiere}/${id}`, Matiere);
  }

   deleteMatiere(id: string): Observable<any> {
    return this._http.delete<any>(`${ApiRoutes.matiere}/${id}`);
  }

}
