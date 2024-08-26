import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, FormArray, FormControl, AbstractControl, isFormControl } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FournisseurService } from 'src/app/services/fournisseur .service';
import { Fournisseur } from 'src/app/models/fournisseur';

@Component({
  selector: 'app-add-chauf',
  templateUrl: './addFournisseur.component.html',
  styleUrls: ['./addFournisseur.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class AddFournisseurComponent implements OnInit {
  @Output() chauffeurAdded: EventEmitter<any> = new EventEmitter();

  fournisseurForm!: FormGroup;
  selectedFile: File | null = null;
  insertionMode: string = 'allAtOnce';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _fournisseurService: FournisseurService,
    private dialogRef: MatDialogRef<AddFournisseurComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
   }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.fournisseurForm = this.fb.group({
      firstName: ['', Validators.required],
      cin: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      photo: [''],
      credit: [''],
    
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
    return this.fournisseurForm.get('insertionForms') as FormArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fournisseurForm.patchValue({
        photo: file
      });
    }
  }

  onInsertionModeChange(type: string): void {
    this.insertionMode = type;
  }
  totalCredit:number   = 0 
  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.fournisseurForm.value.firstName);
      formData.append('lastName', this.fournisseurForm.value.lastName);
      formData.append('cin', this.fournisseurForm.value.cin);
      formData.append('mobile', this.fournisseurForm.value.mobile);
      formData.append('email', this.fournisseurForm.value.email);
      formData.append('address', this.fournisseurForm.value.address);
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }
      formData.append('credit', this.totalCredit.toString());
      this._fournisseurService.postFournisseur(formData, this.data._id).subscribe(res => {
        if (res) {
          this.toastr.success('Fournisseur added successfully', 'Success');
          this.dialogRef.close();
          this.chauffeurAdded.emit(res);
        }
      });
    } else {
      this.fournisseurForm.markAllAsTouched();
    }
  }
}
