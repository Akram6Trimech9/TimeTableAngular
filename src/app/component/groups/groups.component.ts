import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from 'src/app/services/group.service';
import { TimeTableService } from 'src/app/services/timeTable.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class GroupsComponent implements OnInit {
  groups!: any[];
  addGroupForm!: FormGroup;
  editGroupForm!: FormGroup;
  selectedGroup: any;
  selectedGroupTimetable: any[] = [];
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  expandedTimetables: Set<number> = new Set(); // Track expanded timetables

  @ViewChild('timetableModal') timetableModal!: TemplateRef<any>;
   @ViewChild('pdfContent') pdfContent!: ElementRef;  
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.loadGroups();
    this.initializeAddGroupForm();
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  initializeAddGroupForm() {
    this.addGroupForm = this.fb.group({
      groupeName: ['', Validators.required],
      studentsNumber: ['', [Validators.required, Validators.min(1)]],
    });
  }

  openAddGroupModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  addGroup() {
    if (this.addGroupForm.valid) {
      this.groupService.addGroup(this.addGroupForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Groupe ajouté avec succès !');
          this.loadGroups();
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.toastr.error('Échec de l\'ajout du groupe.');
        }
      });
    }
  }
  downloadTimetableAsPDF(id: any) {
    const content = document.getElementById(id);
    if (content) {
      html2canvas(content).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('timetable.pdf');
      });
    }
  }

  
  openEditGroupModal(content: any, group: any) {
    this.editGroupForm = this.fb.group({
      groupeName: [group.groupeName, Validators.required],
      studentsNumber: [group.studentsNumber, [Validators.required, Validators.min(1)]],
    });
    this.selectedGroup = group;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateGroup() {
    if (this.editGroupForm.valid && this.selectedGroup) {
      this.groupService.updateGroup(this.selectedGroup._id, this.editGroupForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Groupe mis à jour avec succès !');
          this.loadGroups();
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.toastr.error('Échec de la mise à jour du groupe.');
        }
      });
    }
  }

  deleteGroup(groupId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
      this.groupService.deleteGroup(groupId).subscribe({
        next: (response) => {
          this.toastr.success('Groupe supprimé avec succès !');
          this.loadGroups();
        },
        error: (err) => {
          this.toastr.error('Échec de la suppression du groupe.');
        }
      });
    }
  }

  viewTimetable(group: any) {
    this.selectedGroup = group;
    this.groupService.getGrouPEmploi(group._id).subscribe({
      next: (response) => {
        this.selectedGroupTimetable = response.data.timeTable || [];
        this.modalService.open(this.timetableModal, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg'
        });
        console.log('Timetable data:', this.selectedGroupTimetable);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleTimetable(index: number) {
    if (this.expandedTimetables.has(index)) {
      this.expandedTimetables.delete(index);
    } else {
      this.expandedTimetables.add(index);
    }
  }

  downloadTimetable(timetable: any) {
    const dataStr = JSON.stringify(timetable, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `timetable_${timetable.startDate}.json`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  getTimeSlots(timetable: any): any[] {
    const slots = new Set<string>();
    timetable.sessions.forEach((session: any) => {
      slots.add(`${session.start} - ${session.end}`);
    });
    return Array.from(slots).sort();
  }

  getEvents(timetable: any, day: string, timeSlot: string): any[] {
    const dayTimetable = timetable.sessions.filter((session: any) => session.day === day);
    return dayTimetable.filter((event: any) => `${event.start} - ${event.end}` === timeSlot);
  }
}
