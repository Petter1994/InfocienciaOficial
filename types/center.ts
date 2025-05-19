import {Post} from '@/types/post'
import {Course} from '@/types/course'

export type Center = {
  id:number;
  name: string;
  vision: string;
  mission: string;
  investigationLine: string;
  projects: string;
  services: string;
  results: string;
  strategy: string;
  investigators: number;
  investigatorsDoc: number;
  investigatorsMaster: number;
  discipline: string;
  area: string;
  logo?: string
  posts: Post[]
  courses: Course[]
};

export const emptyCenter  = {
  name: '',
  vision: '',
  mission: '',
  investigationLine: '',
  projects: '',
  services: '',
  results: '',
  strategy: '',
  investigators: 0,
  investigatorsDoc: 0,
  investigatorsMaster: 0,
  discipline: '',
  area: '',
  posts: [],
  courses:[]
};

export type CenterPayload = {
  name: string;
  vision: string;
  mission: string;
  investigationLine: string;
  projects: string;
  services: string;
  results: string;
  strategy: string;
  investigators: number;
  investigatorsDoc: number;
  investigatorsMaster: number;
  discipline: string;
  area: string;
  logo?: string
};

export type CenterLanding = {
  id:number;
  icon: string
  capital: string;
  name: string;
  area: string;
  grade: string;
  logo?: string
};
