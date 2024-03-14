import { IProcedure } from "./procedure";
import { IUser } from "./user";

export interface ITreatment {
  id: number;
  uuid: string;
  doctor_id: number | null;
  client_id: number;
  comission_value: number;
  duration: number | null;
  value: number;
  status: string;
  procedures?: IProcedure[]
  created_at: string;
  updated_at: string;
  doctor?: IUser
  client?: IUser
}