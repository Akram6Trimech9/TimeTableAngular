import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher';
 
@Component({
  selector: 'app-detail-teacher',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <img src="{{ data.teacher.photo }}" class="img-fluid rounded" alt="teacher Photo">
            </div>
            <div class="col-md-8">
              <p><strong>Nom:</strong> {{ data.teacher.firstName }}</p>
              <p><strong>Prénom:</strong> {{ data.teacher.lastName }}</p>
               <p><strong>Mobile:</strong> {{ data.teacher.mobile }}</p>
              <p><strong>Email:</strong> {{ data.teacher.email }}</p>
               <p><strong>Address:</strong> {{ data.teacher.grade }}</p>

             </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-secondary" (click)="closeDialog()">Close</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./detailTeacher.component.css']
})
export class DetailTeacherComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { teacher: Teacher } ,     private dialogRef: MatDialogRef<DetailTeacherComponent> ,
) {
  console.log(data.teacher)
}

  closeDialog(): void {
    this.dialogRef.close();

   }
}
