import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { ApiRoutes } from '../ts/enum';
import { Departement } from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private _http:HttpClient) { }

  postDepartement(departement : any):Observable<Departement>{
     return this._http.post<Departement>(ApiRoutes.departement,departement)
  }
  getAllDepartments(size: number, currentPage: number): Observable<{ success: boolean, data: Departement[] , totalItems:number }> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', size.toString());

    return this._http.get<{ success: boolean, data: Departement[] , totalItems:number  }>(ApiRoutes.departement, { params });
  }
  getAll( ): Observable<{ success: boolean, data: Departement[] }> {
 
    return this._http.get<{ success: boolean, data: Departement[]  }>(`${ApiRoutes.departement}allDepartement` );
  }
  searchDepartments(query: string): Observable<{ success: boolean, data: Departement[] }> {
    const params = new HttpParams().set('query', query);
    return this._http.get<{ success: boolean, data: Departement[] }>(`${ApiRoutes.departement}search`, { params });
  }
  updateDepartement(chauffeur:any , id:any): Observable<{ success: boolean, data: Departement }> {
     return this._http.patch<{ success: boolean, data: Departement }>(`${ApiRoutes.departement}${id}`, chauffeur);
  }
  deleteDepartement(id:any): Observable<{ success: boolean, message: string }> {
    return this._http.delete<{ success: boolean,  message: string }>(`${ApiRoutes.departement}${id}`);
 }
 getOne(id:any) :Observable<{ success: boolean, data: Departement }>{
  return this._http.get<{ success: boolean, data: Departement }>(`${ApiRoutes.departement}${id}`);
 }

}
