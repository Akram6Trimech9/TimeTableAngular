import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
 import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 import { DepartementService } from 'src/app/services/departement.service';
import {  Departement} from 'src/app/models/departement';
 import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teachers.service';
import { DetailChaufComponent } from './modal/detailChauf/detailChauf.component';
  
@Component({
  selector: 'matiere-details',
  standalone: true,
  templateUrl: 'matiere-detail.component.html',
  imports: [
    FormsModule, ReactiveFormsModule , NgFor, CommonModule ,RouterModule,MatDialogModule
  ],
  styles:[
    `/* Global Styles */
body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #333;
    background-color: #f5f5f5;
  }
  
   .searchinput {
    border-radius: 20px;
    border-color: #ccc;
    padding: 8px 16px;
    width: 300px;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  button{
    border: none;
    background-color: white;
    }
    button > span > i {
    font-size: 18px;
    color:rgb(64, 57, 90) ;
    }
  .customButton {
    background-color: rgb(64, 57, 90);
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .searchAdd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  
  .card-title{
    background:rgb(64, 57, 90) ;
    padding:15px; 
    color:white
  }
  `
  ]
})
export class DepartementDetailsComponent implements OnInit {
  
   idUser : string = ''
  constructor(  private route: ActivatedRoute,
    private _teacherService: TeacherService,
     private router : Router,public dialog: MatDialog,private toastr: ToastrService  , private _departementService : DepartementService){
    
  }
  departement !: Departement
  teachers : any[] =[]  
   ngOnInit(): void {
     this.route.params.subscribe(params => {
      const id = params['id'];  
      this.idUser = id
     });
     this._departementService.getOne(this.idUser).subscribe(res=>{ 
      this.departement = res.data
      console.log(res.data,"data")
      this.teachers = this.teachers = res.data.teachers || [];
     })
   }
 
  deleteTeacher(id: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette enseignant ?')) {
        this._teacherService.deleteTeacher(id).subscribe(
            (res) => {
                if (res.success) {
                     this.teachers = this.teachers.filter(f => f._id !== id);
                     this.toastr.success('enseignant supprimé avec succès.', 'Succès');
                } else {
                    console.error('Failed to delete enseignant:', res.message);
                    this.toastr.error('Une erreur s\'est produite lors de la suppression d enseignant.', 'Erreur');
                }
            },
            
        );
    }}
  //  addFournisseur(){ 
  //    this.dialog.open(AddFournisseurComponent, {
  //     width: '50%', 
  //     height: '70%', 
  //     data:this.chauffeur
  //   })
  //  }

   showDetails(teacher : Teacher){
    this.dialog.open(DetailChaufComponent,{
      data: { teacher }

    })
  }
}