import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TimeSlot } from 'src/app/models/timeslot';
import { EmploiDateService } from 'src/app/services/date-emploi.service';
import { GroupService } from 'src/app/services/group.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { SalleServiceService } from 'src/app/services/salleService .service';
import { TimeTableService } from 'src/app/services/timeTable.service';

@Component({
  selector: 'app-edit-timetable',
  templateUrl: './edit-timetable.component.html',
  styleUrls: ['./edit-timetable.component.scss']
})
export class EditTimetableComponent  implements OnInit{
  editForm: FormGroup;
  sessionForm: FormGroup;
  timetable: any;
  selectedSession: any;
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  start!:Date ;
  end!:Date ; 
  selectedDateRange:any 
  timeSlots: TimeSlot[] = [];
  events: Event[] = [];
  newEvent: Event = {} as Event 
    newTimeSlot: TimeSlot = { start: '', end: '' };
  newClass: string = '';
  groups !: any[]
  matieres!:any[]
  salles !: any[]
  allNewEvents : any[]=[]
  allDates !:any[]

  constructor(
    private fb: FormBuilder,
    private timetableService: TimeTableService,
    private toastr: ToastrService,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private  _roomService: SalleServiceService, private _groupService : GroupService , private  _matiereService : MatiereService,
 private _emploiDatesService : EmploiDateService
  ) {
    console.log(data,"data")
    this.editForm = this.fb.group({
      emploiDateId: [data.emploiDateId, Validators.required],
      timeSlots: [data.timeSlots, Validators.required]
    });

    this.sessionForm = this.fb.group({
      day: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      matiere: ['', Validators.required],
      room: ['', Validators.required],
      group: ['', Validators.required]
    });

    this.timetable = data;
  }
 ngOnInit(): void {
  this._emploiDatesService.getAllEmploiDates().subscribe({
    next:(dates:any)=> { 
       this.allDates = dates
    },error:(err)=>{ 
         console.error(err)
    }
  })
  this._groupService.getAllGroups().subscribe({
    next: (groups) => {
      this.groups = groups;
       
    },
    error: (err) => {
      console.log(err);
    }
  });
  this._matiereService.getAllMatieres().subscribe(
    {
      next:(value)=> {
          this.matieres = value.data
      },error:(err) => {
        console.log(err);
      },
   }
  )
  this._roomService.getAllRooms().subscribe({
    next:(value)=> {
        this.salles = value.data
    },error:(err) => {
      console.log(err);
    },
 })
 }
  editSession(session: any) {
    this.selectedSession = { ...session };
    this.sessionForm.patchValue({
      day: session.day,
      start: session.start,
      end: session.end,
      matiere: session.matiere._id,
      room: session.room._id,
      group: session.group._id
    });
  }

  saveSession() {
    if (this.sessionForm.valid) {
      const updatedSession = { ...this.selectedSession, ...this.sessionForm.value };
      const index = this.timetable.sessions.findIndex((s: any) => s._id === this.selectedSession._id);
      if (index !== -1) {
        this.timetable.sessions[index] = updatedSession;
      }
      this.timetableService.update(this.data._id, this.editForm.value).subscribe(res => {
        this.toastr.success('Timetable updated successfully', 'Success');
      }, error => {
        this.toastr.error('Error updating timetable', 'Error');
      });
    }
  }
}
