export type Post = {
  id: number;
  title: string;
  body: string;
  author: string;
  coverImage?: string;
  date: Date;
  tags: string;
  thumbnail?: string;
};

export type PostFull = {
  id: number;
  title: string;
  body: string;
  author: string;
  coverImage?: string;
  date: Date;
  tags: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
};


export type PostPayload = {
  title: string;
  body: string;
  author: string;
  coverImage?: string;
  date: Date;
  tags: string
  center: number
};

export const emptyPost: Post = {
  id: 99999,
  title: "",
  author: "",
  body: "",
  date: new Date,
  tags:''
}

export const emptyPostFull: PostFull = {
  id: 99999,
  title: "",
  author: "",
  body: "",
  date: new Date,
  tags:'',
  createdAt: new Date,
  updatedAt: new Date
}