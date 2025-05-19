import {Course, CoursePayload} from "@/types/course";
import {PrismaClient, Prisma} from '@prisma/client'


const prisma = new PrismaClient()

export async function getAll() {
    try {
        const courseFromDb = await prisma.course.findMany()
        if (!courseFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {event: courseFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function createCourse(course: CoursePayload) {
    try {
        // 1. Validaciones básicas
        if (!course.name || course.name.trim().length === 0) {
            throw new Error('El nombre del curso es requerido');
        }


        // 2. Preparar datos (con valores por defecto)
        const courseData: Prisma.EventCreateInput = {
            name: course.name.trim(),
            cloister: course.cloister,
            logo: course.logo?.trim() || null,
            date: course.date,
            state: course.state,
            description: course.description,
            centerId: course.centerId
        };

        // 3. Crear el curso
        const courseFromDb = await prisma.course.create({
            data: courseData
        });

        return {
            course: courseFromDb,
            ok: true
        };

    } catch (error: any) {
        console.error('Error en create Course:', error);

        // Manejo específico para errores de Prisma
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    error: 'DUPLICATED_EVENT',
                    message: `Ya existe un curso con el nombre "${course.name}"`,
                    ok: false
                };
            }
        }

        return {
            error: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error desconocido al crear curso',
            ok: false
        };
    }
}


export async function updateCourse(id: number, course: CoursePayload) {
    try {

        const updateData: Prisma.CourseUpdateInput = {
            name: course.name.trim(),
            cloister: course.cloister,
            logo: course.logo?.trim() || null,
            date: course.date,
            state: course.state,
            description: course.description,
            centerId: course.centerId
        }

        const updatedCourse = await prisma.course.update({
            where: {id},
            data: updateData,
        })

        return {course: updatedCourse, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function getById(id: number) {
    try {

        const courseFromDb: Course | null = await prisma.course.findUnique(
            {
                where: {id},
            },
        )
        if (!courseFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }

        return {course: courseFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function deleteById(id: number) {
    try {
        const courseFromDb: Course | null = await prisma.course.delete(
            {
                where: {id},
            },
        )
        if (!courseFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {course: courseFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}



