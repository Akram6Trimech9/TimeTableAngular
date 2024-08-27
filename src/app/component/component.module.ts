import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
  import { NgbdnavBasicComponent } from './nav/nav.component';
 import { CardsComponent } from './card/card.component';
 import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
 import { CheckOrCreateEmploisComponent } from './check-or-create-emplois/check-or-create-emplois.component';
import { TimetableComponent } from './check-or-create-emplois/modal/timetable/timetable.component';
import { SignleTimeTableComponent } from './check-or-create-emplois/modal/signle-time-table/signle-time-table.component';
import { GroupsComponent } from './groups/groups.component';
import { MatiereComponent } from './matiere/matiere.component';
import { SalleComponent } from './salle/salle.component';
import { DateEmploiComponent } from './date-emploi/date-emploi.component';
import { EditTimetableComponent } from './check-or-create-emplois/modal/edit-timetable/edit-timetable.component';
   
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
     
    NgbdnavBasicComponent,
     CardsComponent,
     MatDialogModule,
    ToastrModule.forRoot(),
    
  ],
  providers:[
    
  ],
  declarations: [

              CheckOrCreateEmploisComponent,
             SignleTimeTableComponent,
             EditTimetableComponent,
     
   ]
})
export class ComponentsModule { }
