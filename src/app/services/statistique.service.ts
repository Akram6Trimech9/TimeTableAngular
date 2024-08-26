import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../ts/enum';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
 
  constructor(private http: HttpClient) { }

  getAllStatistics(): Observable<any> {
    return this.http.get(`${ApiRoutes.statistique}all-statistics`);
  }
}
