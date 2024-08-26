import { Routes } from '@angular/router';

import { NgbdnavBasicComponent } from './nav/nav.component';
import { CardsComponent } from './card/card.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { DepartementDetailsComponent } from './MatiereDetails/matiere-detail.component';
 import { CheckOrCreateEmploisComponent } from './check-or-create-emplois/check-or-create-emplois.component';
import { TimetableComponent } from './check-or-create-emplois/modal/timetable/timetable.component';
import { GroupsComponent } from './groups/groups.component';
import { MatiereComponent } from './matiere/matiere.component';
import { SalleComponent } from './salle/salle.component';
import { DateEmploiComponent } from './date-emploi/date-emploi.component';
// import { ChauffeurDetailsComponent } from './chauffeurDetails/chauffeur-detail.component';
 // import { UsersTableComponent } from './users-table/users-table.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'departement',
        component: CardsComponent,
      },
      {
        path: 'departement-details/:id',
        component: DepartementDetailsComponent,
      },
      {
        path: 'teachers',
        component: UsersTableComponent,
      },
   
      {
        path: 'timetable',
        component: TimetableComponent,
      },
      {
        path: 'verifieourcreeremplois',
        component: CheckOrCreateEmploisComponent,
      },
      {
        path: 'gestiongroupes',
        component: GroupsComponent,
      },
      {
        path: 'gestionmatieres',
        component: MatiereComponent,
      },
      {
        path: 'gestionsalles',
        component: SalleComponent,
      },
      {
        path: 'nav',
        component: NgbdnavBasicComponent,
      },
      {
        path: 'dateemploi',
        component: DateEmploiComponent,
      },
    ],
  },
];
