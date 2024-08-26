import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/app/models/event';
import { TimeSlot } from 'src/app/models/timeslot';
import { TimeTableService } from 'src/app/services/timeTable.service';

@Component({
  selector: 'app-signle-time-table',
  templateUrl: './signle-time-table.component.html',
  styleUrls: ['./signle-time-table.component.scss']
})
export class SignleTimeTableComponent  {
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  timeSlots: TimeSlot[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,     private dialogRef: MatDialogRef<SignleTimeTableComponent>  , private _timetableService : TimeTableService){
    console.log(data,"data") 
    this.timeSlots = data.timeSlots
    }
  getEvents(day: string, timeSlotStart: string): Event[] {
    return this.data.sessions.filter((event:Event) => event.day === day && event.start === timeSlotStart);
  }


}
