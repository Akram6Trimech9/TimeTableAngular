import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Tableau de bord',
    icon: 'bi bi-house-door', 
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/departement',
    title: 'Départements',
    icon: 'bi bi-building',  
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/teachers',
    title: 'Enseignants',
    icon: 'bi bi-person-fill', 
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/component/gestiongroupes',
    title: 'Gestion des Groupes',
    icon: 'bi bi-people-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/gestionmatieres',
    title: 'Gestion des Matières',
    icon: 'bi bi-book-fill',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/gestionsalles',
    title: 'Gestion des Salles',
    icon: 'bi bi-door-closed-fill',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/component/dateemploi',
    title: 'Date Emploi',
    icon: 'bi bi-clock-fill',  
    class: '',
    extralink: false,
    submenu: []
  }  ,
  {
    path: '/component/verifieourcreeremplois',
    title: 'Vérifier ou Créer Emplois',
    icon: 'bi bi-calendar',
    class: '',
    extralink: false,
    submenu: []
  }
];
