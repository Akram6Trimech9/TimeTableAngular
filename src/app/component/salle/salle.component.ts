import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartementService } from 'src/app/services/departement.service';
 import { CommonModule } from '@angular/common';
import { SalleServiceService } from 'src/app/services/salleService .service';
 
@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule]
})
export class SalleComponent implements OnInit {
  rooms!: any[];
  departements!: any[];
  addRoomForm!: FormGroup;
  editRoomForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _departementService: DepartementService,
    private _roomService: SalleServiceService
  ) { }

  ngOnInit(): void {
    this.loadRooms();
    this.getDepartements();
    this.initializeAddRoomForm();
  }

   initializeAddRoomForm() {
    this.addRoomForm = this.fb.group({
      roomName: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
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

   loadRooms() {
    this._roomService.getAllRooms().subscribe({
      next: (value) => {
        this.rooms = value.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   openAddRoomModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

   addRoom() {
    if (this.addRoomForm.valid) {
      console.log(this.addRoomForm.value)
      this._roomService.addRoom(this.addRoomForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Room added successfully!');
          this.loadRooms();  
          this.modalService.dismissAll();   
        },
        error: (err) => {
          this.toastr.error('Failed to add room.');
        }
      });
    }
  }

   openEditRoomModal(content: any, room: any) {
    this.editRoomForm = this.fb.group({
      roomName: [room.roomName, Validators.required],
      capacity: [room.capacity, [Validators.required, Validators.min(1)]],
      DepartementId: [room.DepartementId, Validators.required]
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

   updateRoom(roomId: string) {
    if (this.editRoomForm.valid) {
      this._roomService.updateRoom(roomId, this.editRoomForm.value).subscribe({
        next: (response:any) => {
          this.toastr.success('Room updated successfully!');
          this.loadRooms();   
          this.modalService.dismissAll();  
        },
        error: (err) => {
          this.toastr.error('Failed to update room.');
        }
      });
    }
  }

   deleteRoom(roomId: string) {
    if (confirm('Are you sure you want to delete this room?')) {
      this._roomService.deleteRoom(roomId).subscribe({
        next: (response) => {
          this.toastr.success('Room deleted successfully!');
          this.loadRooms();  
        },
        error: (err) => {
          this.toastr.error('Failed to delete room.');
        }
      });
    }
  }
}
