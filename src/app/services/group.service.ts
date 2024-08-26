import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../ts/enum'; // Make sure ApiRoutes is properly defined

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _http: HttpClient) { }

   getAllGroups(): Observable<any> {
    return this._http.get<any>(ApiRoutes.groups);
  }

   getGroupById(id: any): Observable<any> {
    return this._http.get<any>(`${ApiRoutes.groups}/${id}`);
  }

   addGroup(group: any): Observable<any> {
    return this._http.post<any>(ApiRoutes.groups, group);
  }

   updateGroup(id: string, group: any): Observable<any> {
    return this._http.put<any>(`${ApiRoutes.groups}/${id}`, group);
  }

   deleteGroup(id: string): Observable<any> {
    return this._http.delete<any>(`${ApiRoutes.groups}/${id}`);
  }
  getGrouPEmploi(groupId:string):Observable<any>{
     return this._http.get<any>(`${ApiRoutes.groups}/${groupId}/timetable`)
  }
}
