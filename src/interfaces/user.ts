export enum IUserType {
  DOCTOR = 'doctor',
  CLIENT = 'client'
}

export interface IUser {
  id: number;
  uuid: string;
  name: string;
  email: string
  type: IUserType;
  created_at: Date;
  updated_at: Date;
}