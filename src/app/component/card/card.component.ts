import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DetailDepComponent } from './modals/detailDep/detailDep.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';
import { AddDepComponent } from './modals/addDep/addDep.component';
import { EditDepartementComponent } from './modals/editDep/editDepartement.component';
@Component({
  templateUrl: 'card.component.html',
  styleUrls:['card.component.css'],
  standalone: true,
  imports:[CommonModule,RouterModule,MatDialogModule,MatPaginatorModule,FormsModule]
})
export class CardsComponent implements OnInit {
   departements : Departement[] =[]
   totalItems = 0;
   pageSize = 5;
   currentPage = 1;
   searchQuery: string = '';
   selectedDepartement: Departement[] = [];

  constructor(private router : Router,public dialog: MatDialog,private toastr: ToastrService , private _Departmentservice : DepartementService){}
  pageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getDepartments();
  }
  ngOnInit(): void {
    this.getDepartments()
  }
  getDepartments(): void {
    this._Departmentservice.getAllDepartments(this.pageSize, this.currentPage).subscribe(res => {
      this.departements = res.data;
      this.totalItems = res.totalItems;
    });
  }
  takeMeToDetails(id:any){ 
   }
  openDetails(departement : Departement){
    this.dialog.open(DetailDepComponent , {
      data: { departement }
    }
    );

  }
  openAddDep(){
    const dialogRef = this.dialog.open(AddDepComponent,  );

    dialogRef.componentInstance.departementAdded.subscribe((event) => {
          console.log(event.data,"event")
        this.departements.push(event.data)
        console.log(this.departements,"Departments table ")
    });
  }  
  deletedepartement(departement: Departement): void { 
    this._Departmentservice.deleteDepartement(departement._id).subscribe(res => {
      if (res.success) {
        this.departements = this.departements.filter((item: Departement) => item._id !== departement._id);
        this.toastr.success('department deleted successfully', 'Success', {
          positionClass: 'toast-bottom-right'
        });
      }
    });
  }
  onCheckboxChange(event: any, departement: Departement): void {
    if (event.target.checked) {
      this.selectedDepartement.push(departement);
     } else {
      const index = this.selectedDepartement.findIndex((selected) => selected._id === departement._id);
      if (index !== -1) {
        this.selectedDepartement.splice(index, 1);
      }
    }
  }
  onActionChange(event:any): void {
    if (event.target.value === 'deleteAll') {
      this.departements.forEach(async (departement: Departement) => {
        await this._Departmentservice.deleteDepartement(departement._id).subscribe(res => {
          if (res.success) {
            this.departements = this.departements.filter((item: Departement) => item._id !== departement._id);
          }
        });
        this.selectedDepartement= []
      });

     } else if (event.target.value  === 'deleteSelected') {
      this.selectedDepartement.forEach(async (departement: Departement) => {
        await this._Departmentservice.deleteDepartement(departement._id).subscribe(res => {
          if (res.success) {
            this.departements = this.departements.filter((item: Departement) => item._id !== departement._id);
          }
        });
        this.selectedDepartement= []

      });
     }
  }
  
  editDepartement(departement: Departement): void {
    const dialogRef = this.dialog.open(EditDepartementComponent, {
      data: { departement }
    });

    dialogRef.componentInstance.departementEdited.subscribe(updatedChauffeur => {
       const index = this.departements.findIndex(ch => ch._id === updatedChauffeur.data._id);
      if (index !== -1) {
        this.departements[index] = updatedChauffeur.data;
      }
    });
  }
  addDep(){
    this.dialog.open(AddDepComponent);
  }
   searchDepartments() {
    this._Departmentservice.searchDepartments(this.searchQuery).subscribe(
      res=>{
           if (res.success) {
            this.departements = res.data;
          }
        },
         
     );
  }
}
