import {Comment} from '@/types/comment'

export type User = {
    id: number,
    name?: string
    email: string,
    bio?: string,
    avatar?: string,
    password: string,
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
    role: 'USER' | 'ADMIN',
    resetPasswordCode?: string,
    resetPasswordExpires?: Date,
}

export type UserFromDb ={
    id: number,
    name?: string
    email: string,
    bio?: string,
    avatar?: string,
    password: string,
    comments: Comment[],
    createdAt: Date,
    updatedAt: Date,
    role: 'USER' | 'ADMIN',
}

export type UserPayload = {
    email: string,
    password: string
}

export type UserEditPayload = {
    name?: string
    email: string,
    bio?: string,
    avatar?: string,
}


export type UserRegisterPayload= {
    name?: string
    email: string,
    bio?: string,
    avatar?: string,
    password: string,
}



export type UserForm = {
    name: string
    email: string,
    pass2: string,
    password: string,
    bio?: string | null,
}

export type PassForm ={
    password: string,
    pass2: string,
}

export type UserFormError= {
    name: string
    email: string,
    password: string,
    pass2: string,
}


export type PassFormError= {
    password: string,
    pass2: string,
}

export type UserData ={
    name: string,
    email: string,
    bio: string | null
    avatar?: string
}

export type CurrentUser ={
    id: number,
    email: string,
    name: string,
    bio?: string,
    role: 'USER' | 'ADMIN',
    avatar?: string,
    password: string,
    dummyPass: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export type MiddlewareUser= {
    id: number,
    email: string,
    name: string,
    bio?: string,
    role: 'USER' | 'ADMIN',
    avatar?: string,
    dummyPass: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export type UserChangePasswordPayload= {
    oldPassword: string,
    password: string
}

export type UserCreatePasswordPayload= {
    password: string
}

export const initialLoginFormData = {
    name: "",
    email: "",
    password: "",
}

export const initialRegisterFormData = {
    email: "",
    name: "",
    bio: "",
    password: "",
    pass2: "",
}