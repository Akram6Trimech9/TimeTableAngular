import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-edit-departement',
  standalone: true,
  templateUrl: './editDepartement.component.html',
   styleUrls: ['./editDepartement.component.css'],
  imports: [MatDialogModule,ReactiveFormsModule,CommonModule,FormsModule],
})
export class EditDepartementComponent {
  @Output() departementEdited: EventEmitter<any> = new EventEmitter();  

  departementForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileBase64: string | ArrayBuffer | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { departement: Departement } ,private fb: FormBuilder , private  _departementService : DepartementService , 
    private dialogRef: MatDialogRef<EditDepartementComponent> ,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.departementForm = this.fb.group({
      name: [this.data.departement.name, Validators.required],
      photo: [this.data.departement.photo]
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
  
      this.departementForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit(): void {
    if (this.departementForm.valid) {
       if(this.selectedFile){
        const formData = new FormData();
        formData.append('name', this.departementForm.value.name);
        formData.append('photo', this.selectedFile);
        this._departementService.updateDepartement(formData, this.data.departement._id).subscribe(res => {
          if (res) {
            this.toastr.success('departement updated successfully', 'Success');
            this.dialogRef.close();
            this.departementEdited.emit(res);
          }
        });
       }else{
         const  record : Departement  ={
             ...this.departementForm.value
         }
        this._departementService.updateDepartement(record, this.data.departement._id).subscribe(res => {
          if (res) {
            this.toastr.success('departement updated successfully', 'Success');
            this.dialogRef.close();
            this.departementEdited.emit(res);
          }
        });
       }
     
    } else {
      this.departementForm.markAllAsTouched();
    }
  }
  
  
 }
