import { ICar } from "./ICar";
export interface IService {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  createdAt: Date;
  car: ICar;
}
