import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { ApiRoutes } from '../ts/enum';
import { Departement } from '../models/departement';

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

  constructor(private _http:HttpClient) { }

  postTimeTable(timeTable : any):Observable<any>{
     return this._http.post<any>(ApiRoutes.timetable,timeTable)
  }
  getTimeTable(id:any):Observable<any>{
    return this._http.get<any>(`${ApiRoutes.timetable}${id}`)
 }
 checkDateForProfessor( professorId : string, data:any) :Observable<any>{
  return this._http.post<any>(`${ApiRoutes.timetable}check/${professorId}`,data)

 }
 checkRoomAvailability(roomId: any  ,record : any) :Observable<any>{
   return this._http.post<any>(`${ApiRoutes.timetable}checkRoom/${roomId}`,record)
 }
 checkGroupAvailability(groupId: any  ,record : any):Observable<any>{
  return this._http.post<any>(`${ApiRoutes.timetable}check-group/${groupId}`,record)
 }
 deleteTimeTable(timeTableId: string  ):Observable<any>{
  return this._http.delete<any>(`${ApiRoutes.timetable}${timeTableId}` )
 }
 getAllDates( ):Observable<any>{
  return this._http.delete<any>(`${ApiRoutes.timetable}all-dates` )
 }
 groupeTimeTable(groupId : string ) :Observable<any>{
  return this._http.get<any>(`${ApiRoutes.timetable}group/${groupId}` )

 }
 update(timeTableId :any , record :any) :Observable<any>{
  return this._http.put<any>(`${ApiRoutes.timetable}${timeTableId}`,record )
 }
 }
