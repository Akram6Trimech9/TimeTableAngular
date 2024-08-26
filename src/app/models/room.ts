import { Departement } from "./departement";

export interface IRoom {
    _id?: string;
    roomName: string;
    capacity:string,
      departement?:Departement 
  }