import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmploiDateService } from 'src/app/services/date-emploi.service';
 
@Component({
  selector: 'app-date-emploi',
  templateUrl: './date-emploi.component.html',
  styleUrls: ['./date-emploi.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})
export class DateEmploiComponent {
  emploiDates!: any[];
  addDateEmploiForm!: FormGroup;
  editDateEmploiForm!: FormGroup;
  selectedEmploiId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private emploiDateService: EmploiDateService
  ) { }

  ngOnInit(): void {
    this.loadEmploiDates();
    this.initializeAddDateEmploiForm();
  }

  initializeAddDateEmploiForm() {
    this.addDateEmploiForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  loadEmploiDates() {
    this.emploiDateService.getAllEmploiDates().subscribe({
      next: (response) => {
        this.emploiDates = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openAddEmploiModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  addEmploiDate() {
    if (this.addDateEmploiForm.valid) {
      this.emploiDateService.addEmploiDate(this.addDateEmploiForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Date emploi ajoutée avec succès !');
          this.loadEmploiDates();  
          this.modalService.dismissAll();   
        },
        error: (err) => {
          this.toastr.error('Échec de l\'ajout de la date emploi.');
        }
      });
    }
  }

  openEditEmploiModal(content: any, emploi: any) {
    this.selectedEmploiId = emploi._id;
    this.editDateEmploiForm = this.fb.group({
      startDate: [emploi.startDate, Validators.required],
      endDate: [emploi.endDate, Validators.required],
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateEmploiDate() {
    if (this.editDateEmploiForm.valid && this.selectedEmploiId) {
      this.emploiDateService.updateEmploiDate(this.selectedEmploiId, this.editDateEmploiForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Date emploi mise à jour avec succès !');
          this.loadEmploiDates();   
          this.modalService.dismissAll();  
        },
        error: (err) => {
          this.toastr.error('Échec de la mise à jour de la date emploi.');
        }
      });
    }
  }

  deleteEmploiDate(emploiId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette date emploi ?')) {
      this.emploiDateService.deleteEmploiDate(emploiId).subscribe({
        next: (response) => {
          this.toastr.success('Date emploi supprimée avec succès !');
          this.loadEmploiDates();  
        },
        error: (err) => {
          this.toastr.error('Échec de la suppression de la date emploi.');
        }
      });
    }
  }
}
