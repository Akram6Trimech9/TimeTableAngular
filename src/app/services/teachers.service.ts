import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { ApiRoutes } from '../ts/enum';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private _http:HttpClient) { }

  postTeacher(Teacher : any , idChauffeur:any):Observable<Teacher>{
     return this._http.post<Teacher>(`${ApiRoutes.Teacher}${idChauffeur}`,Teacher)
  }
  getAllTeacher(size: number, currentPage: number): Observable<{ success: boolean, data: Teacher[] , totalItems:number }> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', size.toString());

    return this._http.get<{ success: boolean, data: Teacher[] , totalItems:number  }>(ApiRoutes.Teacher, { params });
  }
  getAll(): Observable<{ success: boolean, data: Teacher[]}> {
    return this._http.get<{ success: boolean, data: Teacher[] }>(`${ApiRoutes.Teacher}all`);
  }
  searchTeachers(query: string): Observable<{ success: boolean, data: Teacher[] }> {
    const params = new HttpParams().set('query', query);
    return this._http.get<{ success: boolean, data: Teacher[] }>(`${ApiRoutes.Teacher}search`, { params });
  }
  updateTeacher(Teacher:any , id:any): Observable<{ success: boolean, data: Teacher }> {
     return this._http.patch<{ success: boolean, data: Teacher }>(`${ApiRoutes.Teacher}${id}`, Teacher);
  }
  deleteTeacher(id:any): Observable<{ success: boolean, message: string }> {
    return this._http.delete<{ success: boolean,  message: string }>(`${ApiRoutes.Teacher}${id}`);
 }
 getOne(id:any) :Observable<{ success: boolean, data: Teacher }>{
  return this._http.get<{ success: boolean, data: Teacher }>(`${ApiRoutes.Teacher}${id}`);
 }
 updateCredit(credit:any , id:any): Observable<{ success: boolean, data: Teacher }> {
  return this._http.patch<{ success: boolean, data: Teacher }>(`${ApiRoutes.Teacher}credit/${id}`, credit);
}
}
