export type Course = {
  id:number;
  name: string;
  cloister: string;
  description: string;
  date: Date;
  state: 'ACTIVE' | 'INACTIVE',
  logo?: string
  centerId: number
};

export const emptyCourse  = {
  name: '',
  cloister: '',
  description: '',
  date: new Date(),
  state: 'ACTIVE',
  centerId: 9999999
};

export type CoursePayload = {
  name: string;
  cloister: string;
  description: string;
  date: Date;
  state: 'ACTIVE' | 'INACTIVE',
  logo?: string
  centerId: number
};
