import { Departement } from "./departement";

 
export interface Teacher {
  _id?: string;
  firstName: string;
   mobile: string;
  lastName: string;
  email: string;
   grade: string;
   photo?: string;
   departement?: Departement;
 }
