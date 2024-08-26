import { Departement } from "./departement";

export interface IMatiere {
    _id?: string;
    matiereName: string;
    departement?: Departement;
  }