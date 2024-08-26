import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { Teacher } from 'src/app/models/teacher';
import { DepartementService } from 'src/app/services/departement.service';
import { TeacherService } from 'src/app/services/teachers.service';
 
@Component({
  selector: 'app-edit-teacher',
  standalone: true,
  templateUrl: './editTeacher.component.html',
   styleUrls: ['./editTeacher.component.css'],
  imports: [MatDialogModule,ReactiveFormsModule,CommonModule,FormsModule],
})
export class EditTeacherComponent {
  @Output() teacherEddited: EventEmitter<any> = new EventEmitter();  
  departements!: Departement[]
  teacher!:Teacher
  teacherForm!: FormGroup;
  selectedFile: File | null = null;
  selectedFileBase64: string | ArrayBuffer | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { teacher: Teacher } ,private fb: FormBuilder , private  _departementService : DepartementService , 
    private dialogRef: MatDialogRef<EditTeacherComponent> ,
    private toastr: ToastrService,
    private _teacherService : TeacherService

  ) {}

  ngOnInit(): void {
    this._departementService.getAll().subscribe(res => {
      this.departements = res.data
    })
    this.teacherForm = this.fb.group({
      firstName: [this.data.teacher.firstName, Validators.required],
       mobile: [this.data.teacher.mobile, [Validators.required, Validators.pattern(/^\d+$/)]],
      lastName: [this.data.teacher.lastName, Validators.required],
      email: [this.data.teacher.email, [Validators.required, Validators.email]],
       grade: [this.data.teacher.grade, Validators.required],
      photo: [this.data.teacher.photo],
      departerment: [this.data.teacher.departement, Validators.required],
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
  
      this.teacherForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit(): void {
    if (this.teacherForm.valid) {
       if(this.selectedFile){
        const formData = new FormData();
        formData.append('firstName', this.teacherForm.value.firstName);
         formData.append('mobile', this.teacherForm.value.mobile);
        formData.append('lastName', this.teacherForm.value.lastName);
        formData.append('email', this.teacherForm.value.email);
         formData.append('grade', this.teacherForm.value.grade);
        formData.append('photo', this.selectedFile);
        this._teacherService.updateTeacher(formData, this.data.teacher._id).subscribe(res => {
          if (res) {
            this.toastr.success('teacher updated successfully', 'Success');
            this.dialogRef.close();
            this.teacherEddited.emit(res);
          }
        });
       }else{
         const  record : Teacher  ={
             ...this.teacherForm.value
         }
        this._teacherService.updateTeacher(record, this.data.teacher._id).subscribe(res => {
          if (res) {
            this.toastr.success('Teacher updated successfully', 'Success');
            this.dialogRef.close();
            this.teacherEddited.emit(res);
          }
        });
       }
     
    } else {
      this.teacherForm.markAllAsTouched();
    }
  }
  
  
 }
