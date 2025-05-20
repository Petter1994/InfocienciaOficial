export type Course = {
  id:number;
  name: string;
  cloister: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  state: 'ACTIVE' | 'INACTIVE',
  logo?: string
  centerId: number
};

export const emptyCourse  = {
  name: '',
  cloister: '',
  description: '',
  dateStart: new Date(),
  dateEnd: new Date(),
  state: 'ACTIVE',
  centerId: 9999999
};

export type CoursePayload = {
  name: string;
  cloister: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  state: 'ACTIVE' | 'INACTIVE',
  logo?: string
  centerId: number
};
