import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, FormArray, FormControl, AbstractControl, isFormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/models/departement';
import { TeacherService } from 'src/app/services/teachers.service';
import { DepartementService } from 'src/app/services/departement.service';
 
@Component({
  selector: 'app-add-chauf',
  templateUrl: './addTeacher.component.html',
  styleUrls: ['./addTeacher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class AddTeacherComponent implements OnInit {
  @Output() teacherAdded: EventEmitter<any> = new EventEmitter();

  teacherForm!: FormGroup;
  selectedFile: File | null = null;
  insertionMode: string = 'allAtOnce';
  form!: FormGroup;
  departements!: Departement[]
  constructor(
    private fb: FormBuilder,
    private _teacherService: TeacherService,
    private _departementService:  DepartementService,
    private dialogRef: MatDialogRef<AddTeacherComponent>,
    private toastr: ToastrService,
   ) {
   }

  ngOnInit(): void {
    this.initForm();
   this._departementService.getAll().subscribe(res => {
      this.departements = res.data
    })
   }

  initForm() {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      grade: ['', Validators.required],
      photo: [''],
      departement: ['', Validators.required], 
    
    });
  }

  getTotalCredit() {
    let total = 0;
    this.insertionForms.controls.forEach((control: AbstractControl) => {
      if (control instanceof FormGroup) {  
        const creditControl = control.get('credit');
        if (isFormControl(creditControl)) {
          total += creditControl.value ? parseFloat(creditControl.value) : 0;
        }
      }
    });
    return total;
  }

  addForm() {
    this.insertionForms.push(this.fb.group({
      credit: [''],
      paymentType: ['espece']
    }));
  }

  removeForm(index: number) {
    this.insertionForms.removeAt(index);
  }

  get insertionForms(): FormArray {
    return this.teacherForm.get('insertionForms') as FormArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.teacherForm.patchValue({
        photo: file
      });
    }
  }

  onInsertionModeChange(type: string): void {
    this.insertionMode = type;
  }
  totalCredit:number   = 0 
  onSubmit(): void {
    if (this.teacherForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.teacherForm.value.firstName);
      formData.append('lastName', this.teacherForm.value.lastName);
       formData.append('mobile', this.teacherForm.value.mobile);
      formData.append('email', this.teacherForm.value.email);
      formData.append('grade', this.teacherForm.value.grade);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }
      this._teacherService.postTeacher(formData ,    this.teacherForm.value.departement).subscribe(res => {
        if (res) {
          this.toastr.success('teacher added successfully', 'Success');
          this.dialogRef.close();
          this.teacherAdded.emit(res);
         }
      });
    } else {
      this.teacherForm.markAllAsTouched();
    }
  }
}
