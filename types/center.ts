export type Center = {
  id:number;
  name: string;
  area: string;
  grade: string;
  logo?: string
};

export const emptyCenter = {
  name: '',
  area: '',
  grade: '',
};

export type CenterPayload = {
  name: string;
  area: string;
  grade: string;
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
