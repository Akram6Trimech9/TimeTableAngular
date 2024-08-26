import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../ts/enum';

@Injectable({
  providedIn: 'root'
})
export class SalleServiceService {

  constructor(private _http: HttpClient) { }

   getAllRooms(): Observable<any> {
    return this._http.get<any>(ApiRoutes.rooms);
  }

   getRoomById(id: any): Observable<any> {
    return this._http.get<any>(`${ApiRoutes.rooms}/${id}`);
  }

   addRoom(room: any): Observable<any> {
    return this._http.post<any>(ApiRoutes.rooms, room);
  }

   updateRoom(id: string, room: any): Observable<any> {
    return this._http.put<any>(`${ApiRoutes.rooms}/${id}`, room);
  }

   deleteRoom(id: string): Observable<any> {
    return this._http.delete<any>(`${ApiRoutes.rooms}/${id}`);
  }
}
