import { IGroup } from "./group";
import { IMatiere } from "./matiere";
import { IRoom } from "./room";

export interface Event {
    day: string;
    start: string;
    end: string;
    room: IRoom;
    matiere:IMatiere;
    group:IGroup

  }