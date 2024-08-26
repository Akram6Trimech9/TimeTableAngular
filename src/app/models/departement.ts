import { Teacher } from "./teacher";

 
export interface Departement {
  _id?: string;
  name: string ;
  photo?: string;
  teachers?: Teacher[];
  selected?: boolean;

}
