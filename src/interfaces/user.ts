export enum IUserType {
  DOCTOR = 'doctor',
  CLIENT = 'client'
}

export interface IUser {
  id: number;
  uuid: string;
  name: string;
  email: string
  type: string;
  created_at: string;
  updated_at: string;
}