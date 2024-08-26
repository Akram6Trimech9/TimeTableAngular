import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
 import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement.service';

@Component({
  selector: 'app-add-de',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './addDep.component.html',
  styleUrls: ['./addDep.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDepComponent implements OnInit {
  @Output() departementAdded: EventEmitter<any> = new EventEmitter();  

  departementForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder , private  _departementService : DepartementService , 
    private dialogRef: MatDialogRef<AddDepComponent> ,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {
    this.departementForm = this.fb.group({
      name: ['', Validators.required],
      photo: ['']
    });
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.departementForm.patchValue({
        photo: file
      });
    }
  }
  onSubmit(): void {
    if (this.departementForm.valid) {
      const formData = new FormData();
      Object.keys(this.departementForm.controls).forEach(key => {
        formData.append(key, this.departementForm.get(key)?.value);
      });
 
      this._departementService.postDepartement(formData).subscribe(res=>{
          if(res){
            this.toastr.success('Departement added successfully', 'Success');
            this.dialogRef.close();
            this.departementAdded.emit(res);
          }
      })
    } else {
      this.departementForm.markAllAsTouched();
    }
  }
}