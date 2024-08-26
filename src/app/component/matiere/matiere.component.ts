import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement.service';
import { MatiereService } from 'src/app/services/matiere.service';
import { SalleServiceService } from 'src/app/services/salleService .service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule]
})
export class MatiereComponent {
  matieres!: any[];
  departements!: any[];
  addMatiereForm!: FormGroup;
  editMatiereForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _departementService: DepartementService,
    private matiereService: MatiereService
  ) { }

  ngOnInit(): void {
    this.loadmatiere();
    this.getDepartements();
    this.initializeaddMatiereForm();
  }

   initializeaddMatiereForm() {
    this.addMatiereForm = this.fb.group({
      matiereName: ['', Validators.required],
       DepartementId: ['', Validators.required]   
    });
  }

   getDepartements() {
    this._departementService.getAll().subscribe({
      next: (value) => {
        this.departements = value.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   loadmatiere() {
    this.matiereService.getAllMatieres().subscribe({
      next: (value) => {
        this.matieres = value.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   openAddmatiereModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

   addmatiere() {
    if (this.addMatiereForm.valid) {
      console.log(this.addMatiereForm.value)
      this.matiereService.addMatiere(this.addMatiereForm.value).subscribe({
        next: (response) => {
          this.toastr.success('matiere added successfully!');
          this.loadmatiere();  
          this.modalService.dismissAll();   
        },
        error: (err) => {
          this.toastr.error('Failed to add matiere.');
        }
      });
    }
  }

   openEditmatiereModal(content: any, matiere: any) {
    this.editMatiereForm = this.fb.group({
      matiereName: [matiere.matiereName, Validators.required],
      capacity: [matiere.capacity, [Validators.required, Validators.min(1)]],
      DepartementId: [matiere.DepartementId, Validators.required]
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

   updatematiere(matiereId: string) {
    if (this.editMatiereForm.valid) {
      this.matiereService.updateMatiere(matiereId, this.editMatiereForm.value).subscribe({
        next: (response:any) => {
          this.toastr.success('matiere updated successfully!');
          this.loadmatiere();   
          this.modalService.dismissAll();  
        },
        error: (err) => {
          this.toastr.error('Failed to update matiere.');
        }
      });
    }
  }

   deletematiere(matiereId: string) {
    if (confirm('Are you sure you want to delete this matiere?')) {
      this.matiereService.deleteMatiere(matiereId).subscribe({
        next: (response) => {
          this.toastr.success('matiere deleted successfully!');
          this.loadmatiere();  
        },
        error: (err) => {
          this.toastr.error('Failed to delete matiere.');
        }
      });
    }
  }
}
