
import { PrismaClient, Prisma } from '@prisma/client'

import {
    UserData,
    UserRegisterPayload
} from "@/types/user";


const prisma = new PrismaClient()

export async function getUsers() {
    try {
        const usersFromDb = await prisma.user.findMany()
        return {user: usersFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function registerUser(user: UserRegisterPayload) {
    
    try {

        const userData = {
            name: user.name || null,
            email: user.email , 
            bio: user.bio || null,
            avatar: user.avatar || null,
            password: user.password,
        };

        const UserFromDb = await prisma.user.create(
            {
                data: {
                   user
                },
            })
       
        return {user: UserFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}



export async function getUserById(id: number) {
    try {
        const userFromDb = await prisma.user.findUnique(
            {
                where: {id},   
            })
        if (!userFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {user: {userFromDb}, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function getUserByEmail(email: string) {
    try {
        const userFromDb = await prisma.user.findUnique(
            {
                where: {email},   
            })
        if (!userFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {user: {userFromDb}, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}



export async function deleteUser(id: number) {
    try {
        const execution = await prisma.user.delete({where: {id}})
        return {execution}
    } catch (error) {
        return {error}
    }
}


export async function updateUserData(user: UserData, id: number) {
    try {
        const userFromDB= await prisma.user.update(
            {
                where: {
                    id: id,
                },
                data: user,
            })
        return {user: userFromDB, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}

export async function updateUserPassword(passWord: string, id: number) {
    try {
        const userFromDB = await prisma.user.update(
            {
                where: {
                    id: id,
                },
                data: {
                    password: passWord
                },
            })

        if (!userFromDB) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {user: userFromDB, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}

export async function updateUserImage(id: number, url: string) {
    try {
        const userFromDB = await prisma.user.update(
            {
                where: {
                    id: id,
                },
                data: {
                    avatar: url
                },

            })
        return {user: userFromDB, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}



export async function validatePass(id: number, password: string) {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })
        if (!user) {
            return {success: false, user: null}
        }
        const userResponse = user

        return {success: user?.password === hashPassword(password) , user: userResponse}
    } catch (error) {
        return {success: false, user: null}
    }
}

