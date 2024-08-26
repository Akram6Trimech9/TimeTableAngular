import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher';
 import {  AddTeacherComponent } from './modal/addTeacher/addTeacher.component';
 import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teachers.service';
import { EditTeacherComponent } from './modal/editTeacher/editTeacher.component';
import { DetailTeacherComponent } from './modal/detailTeacher/detailTeacher.component';
// import { DetailFournisseurComponent } from './modal/detailFournisseur/detailFournisseur.component';
// import { EditFournisseurComponent } from './modal/editFournisseur/editFournisseur.component';
 
@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss'],
    standalone:true,
    imports:[CommonModule,FormsModule]
})
export class UsersTableComponent implements OnInit {

 teachers: Teacher[] = [];
 currentPage: number = 1;
 totalPages: number = 0;
 pageSize: number = 5;
 pages: number[] = [];
 searchQuery: string = '';

 constructor(public dialog: MatDialog,private _teacherService: TeacherService, private toastr: ToastrService) { }

 ngOnInit(): void {
     this.loadTeachers();
     
 }




 loadTeachers(): void {
     this._teacherService.getAllTeacher(this.pageSize, this.currentPage).subscribe((res) => {
         if (res.success) {
             this.teachers = res.data;
             this.totalPages = Math.ceil(res.totalItems / this.pageSize);
             this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
         } else {
             console.error('Failed to fetch teachers');
         }
     });
 }

 onPageChange(page: number): void {
     if (page < 1 || page > this.totalPages) return;
     this.currentPage = page;
     this.loadTeachers();
 }
//  openCreditUpdate(fournisseur:any){
//    const dialogRef = this.dialog.open(AddMinCreditComponent, {
//      data:fournisseur
//    });
//    dialogRef.componentInstance.fournisseurUpdated.subscribe((updatedFournisseur: Teacher) => {
//       const index = this.fournisseurs.findIndex(f => f._id === updatedFournisseur._id);
//       if (index !== -1) {
//        this.fournisseurs[index] = updatedFournisseur;
//      }
//    });
//  }
updateTeacher(teacher: any): void {
   const dialogRef = this.dialog.open(EditTeacherComponent, {
        height: '70%',
       data: { teacher }
   });
   dialogRef.componentInstance.teacherEddited.subscribe((updatedTeacher: any) => {
    console.log(updatedTeacher)
       const index = this.teachers.findIndex(f => f._id === updatedTeacher.data._id);
       if (index !== -1) {
           this.teachers[index] = updatedTeacher.data;
       }
   });
  }
 openAddTeacher(){
   const dialogRef = this.dialog.open(AddTeacherComponent, {
      height: '70%', 
   });
   dialogRef.componentInstance.teacherAdded.subscribe((addedTeacher: any) => {
    console.log(addedTeacher,"addded teacher")
    this.teachers.push(addedTeacher.data)
   })
 }
 search() {
   this._teacherService.searchTeachers(this.searchQuery).subscribe(
     res=>{
          if (res.success) {
           this.teachers = res.data;
         }
       },
           
    );
 }
   
 deleteTeacher(id: any) {
   if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      this._teacherService.deleteTeacher(id).subscribe(
          (res) => {
              if (res.success) {
                   this.teachers = this.teachers.filter(f => f._id !== id);
                  this.toastr.success('Enseignant supprimé avec succès.', 'Succès');
              } else {
                   console.error('Échec de la suppression de l\'enseignant :', res.message);
                  this.toastr.error('Une erreur s\'est produite lors de la suppression de l\'enseignant.', 'Erreur');
              }
          },
      );
  }
}

  // }
   showDetails(teacher : Teacher){
 this.dialog.open(DetailTeacherComponent,{
   data: { teacher }

 })
   }
}
 