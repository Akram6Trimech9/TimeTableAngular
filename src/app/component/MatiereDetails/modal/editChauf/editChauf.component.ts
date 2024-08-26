import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Chauffeur } from 'src/app/models/chauffeur';
import { ChauffeurService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-edit-chauf',
  standalone: true,
  templateUrl: './editChauf.component.html',
   styleUrls: ['./editChauf.component.css'],
  imports: [MatDialogModule,ReactiveFormsModule,CommonModule,FormsModule],
})
export class EditChaufComponent {
  @Output() chauffeurAdded: EventEmitter<any> = new EventEmitter();  

  chauffeurForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileBase64: string | ArrayBuffer | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { chauffeur: Chauffeur } ,private fb: FormBuilder , private  _chauffeurService : ChauffeurService , 
    private dialogRef: MatDialogRef<EditChaufComponent> ,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.chauffeurForm = this.fb.group({
      firstName: [this.data.chauffeur.firstName, Validators.required],
      cin: [this.data.chauffeur.cin, Validators.required],
      mobile: [this.data.chauffeur.mobile, [Validators.required, Validators.pattern(/^\d+$/)]],
      lastName: [this.data.chauffeur.lastName, Validators.required],
      email: [this.data.chauffeur.email, [Validators.required, Validators.email]],
      transportName: [this.data.chauffeur.transportName, Validators.required],
      transportSerie: [this.data.chauffeur.transportSerie, Validators.required],
      photo: [this.data.chauffeur.photo]
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
       const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileBase64 = reader.result;
      };
      reader.onerror = (error) => {
        console.error('File reading failed:', error);
      };
      reader.readAsDataURL(file);
  
      this.chauffeurForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit(): void {
    if (this.chauffeurForm.valid) {
       if(this.selectedFile){
        const formData = new FormData();
        formData.append('firstName', this.chauffeurForm.value.firstName);
        formData.append('cin', this.chauffeurForm.value.cin);
        formData.append('mobile', this.chauffeurForm.value.mobile);
        formData.append('lastName', this.chauffeurForm.value.lastName);
        formData.append('email', this.chauffeurForm.value.email);
        formData.append('transportName', this.chauffeurForm.value.transportName);
        formData.append('transportSerie', this.chauffeurForm.value.transportSerie);
        formData.append('photo', this.selectedFile);
        this._chauffeurService.updateChauffeur(formData, this.data.chauffeur._id).subscribe(res => {
          if (res) {
            this.toastr.success('Chauffeur updated successfully', 'Success');
            this.dialogRef.close();
            this.chauffeurAdded.emit(res);
          }
        });
       }else{
         const  record : Chauffeur  ={
             ...this.chauffeurForm.value
         }
        this._chauffeurService.updateChauffeur(record, this.data.chauffeur._id).subscribe(res => {
          if (res) {
            this.toastr.success('Chauffeur updated successfully', 'Success');
            this.dialogRef.close();
            this.chauffeurAdded.emit(res);
          }
        });
       }
     
    } else {
      this.chauffeurForm.markAllAsTouched();
    }
  }
  
  
 }
