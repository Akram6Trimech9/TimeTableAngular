import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Departement } from 'src/app/models/departement';

@Component({
  selector: 'app-detail-chauf',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <img src="{{ data.departement.photo }}" class="img-fluid rounded" alt="departement Photo">
            </div>
            <div class="col-md-8">
              <p><strong>First Name:</strong> {{ data.departement.name }}</p>
               
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-secondary" (click)="closeDialog()">Close</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./detailChauf.component.css']
})
export class DetailChaufComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { departement: Departement } ,     private dialogRef: MatDialogRef<DetailChaufComponent> ,
) {}

  closeDialog(): void {
    this.dialogRef.close();

   }
}
