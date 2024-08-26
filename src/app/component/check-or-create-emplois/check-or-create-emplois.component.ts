import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teachers.service';
import { TimetableComponent } from './modal/timetable/timetable.component';
import { TimeTableService } from 'src/app/services/timeTable.service';
import { SignleTimeTableComponent } from './modal/signle-time-table/signle-time-table.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
   
@Component({
  selector: 'app-check-or-create-emplois',
  templateUrl: './check-or-create-emplois.component.html',
  styleUrls: ['./check-or-create-emplois.component.scss'],
 })
export class CheckOrCreateEmploisComponent implements OnInit {
  teachers !: Teacher[] 
  constructor(private  _teacherService :TeacherService ,public dialog: MatDialog,private _timeTableService : TimeTableService,    private toastr: ToastrService){


  }
  ngOnInit(): void {
    this._teacherService.getAll().subscribe({
      next: (response) => {
        this.teachers = response.data;
       },
      error: (err) => {
        console.error('Error fetching teachers:', err);
      }
    });
  }
 
  selectedUser: any = null;
  optionsOpen = false;

  toggleOptions() {
    this.optionsOpen = !this.optionsOpen;
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.getimeTable(this.selectedUser._id);
    this.optionsOpen = true
  }
  

  showUserDetails() {
     alert(`Showing details for ${this.selectedUser ? this.selectedUser.name : 'No user selected'}`);
  }

  schedules!: any ;
  addSchedule() {
    const dialogRef = this.dialog.open(TimetableComponent, {
      data: this.selectedUser
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.schedules.push(result); // Add the new schedule to the list
        this.toastr.success('Nouvel emploi du temps ajouté avec succès', 'Succès');
      } else {
        console.log('No new timetable was added');
      }
    });
  }
  
  viewDetaoils(schedule: any) {
    this.dialog.open(SignleTimeTableComponent , {
      data:  schedule 
     })
    }

  getimeTable(id:any){ 
    this._timeTableService.getTimeTable(id).subscribe(res =>{ 
      console.log(res,"okk")
      this.schedules = res.data
    })
   }
   deleteSchedule(schedule: any) {
    this._timeTableService.deleteTimeTable(schedule._id).subscribe(res => {
      if (res) {
        this.schedules = this.schedules.filter((item: any) => item._id !== schedule._id);
        this.toastr.success('L\'emploi du temps a été supprimé avec succès', 'Succès');
      } else {
        this.toastr.error('Échec de la suppression de l\'emploi du temps', 'Erreur');
      }
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'emploi du temps', 'Erreur');
    });
  }
}
