import {Event, EventPayload} from "@/types/event";
import {PrismaClient, Prisma} from '@prisma/client'


const prisma = new PrismaClient()

export async function getAll() {
    try {
        const eventFromDb = await prisma.event.findMany()
        if (!eventFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {event: eventFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function createEvent(event: EventPayload) {
    try {
        // 1. Validaciones básicas
        if (!event.name || event.name.trim().length === 0) {
            throw new Error('El nombre del evento es requerido');
        }

        if (event.name.length > 255) {
            throw new Error('El nombre no puede exceder 255 caracteres');
        }

        // 2. Preparar datos (con valores por defecto)
        const eventData: Prisma.EventCreateInput = {
            name: event.name.trim(),
            area: event.area?.trim() || null,
            logo: event.logo?.trim() || null,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            description: event.description,
            host: event.host
        };

        // 3. Crear el centro
        const eventFromDb = await prisma.event.create({
            data: eventData
        });

        return {
            event: eventFromDb,
            ok: true
        };

    } catch (error: any) {
        console.error('Error en createEvent:', error);

        // Manejo específico para errores de Prisma
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    error: 'DUPLICATED_EVENT',
                    message: `Ya existe un evento con el nombre "${event.name}"`,
                    ok: false
                };
            }
        }

        return {
            error: error.code || 'INTERNAL_ERROR',
            message: error.message || 'Error desconocido al crear evento',
            ok: false
        };
    }
}


export async function updateEvent(id: number, event: EventPayload) {
    try {

        const updateData: Prisma.EventUpdateInput = {
            name: event.name.trim(),
            area: event.area?.trim() || null,
            logo: event.logo?.trim() || null,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd,
            description: event.description,
            host: event.host
        }

        const updatedEvent = await prisma.event.update({
            where: {id},
            data: updateData,
        })

        return {event: updatedEvent, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function getById(id: number) {
    try {

        const eventFromDb: Event | null = await prisma.event.findUnique(
            {
                where: {id},
            },
        )
        if (!eventFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }

        return {event: eventFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function deleteById(id: number) {
    try {
        const eventFromDb: Event | null = await prisma.event.delete(
            {
                where: {id},
            },
        )
        if (!eventFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {event: eventFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}



