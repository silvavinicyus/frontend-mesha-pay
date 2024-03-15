import { IProcedure } from "./procedure";
import { IUser } from "./user";

interface ITreatmentProcedure {
  id: number
  procedure_id: number
  treatment_id: number
  procedure: IProcedure
  created_at: string
}

export interface ITreatment {
  id: number;
  uuid: string;
  doctor_id: number | null;
  client_id: number;
  comission_value: number;
  duration: number | null;
  value: number;
  status: string;
  treatment_procedures?: ITreatmentProcedure[]
  created_at: string;
  updated_at: string;
  doctor?: IUser
  client?: IUser
}