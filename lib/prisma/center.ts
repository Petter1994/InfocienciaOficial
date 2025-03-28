import { Center, CenterPayload } from "@/types/center";
import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient()

export async function getAll() {
    try {
        const centerFromDb = await prisma.center.findMany()
        if (!centerFromDb) {
            return { error: { code: 404 }, message: "not found", ok: false }
        }
        return { center: centerFromDb, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}





export async function createCenter(center: CenterPayload) {
  try {
    // 1. Validaciones básicas
    if (!center.name || center.name.trim().length === 0) {
      throw new Error('El nombre del centro es requerido');
    }

    if (center.name.length > 255) {
      throw new Error('El nombre no puede exceder 255 caracteres');
    }

    // 2. Preparar datos (con valores por defecto)
    const centerData: Prisma.CenterCreateInput = {
      name: center.name.trim(),
      area: center.area?.trim() || null,
      grade: center.grade?.trim() || null,
      logo: center.logo?.trim() || null,
    };

    // 3. Crear el centro
    const centerFromDb = await prisma.center.create({ 
      data: centerData 
    });

    return { 
      center: centerFromDb, 
      ok: true 
    };

  } catch (error: any) {
    console.error('Error en createCenter:', error);

    // Manejo específico para errores de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: 'DUPLICATED_CENTER',
          message: `Ya existe un centro con el nombre "${center.name}"`,
          ok: false
        };
      }
    }

    return {
      error: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Error desconocido al crear centro',
      ok: false
    };
  }
}




export async function updateCenter(id: number, center: CenterPayload) {
    try {

        const updateData: Prisma.CenterUpdateInput = {
            name: center.name.trim(),
            area: center.area?.trim() || null,
            grade: center.grade?.trim() || null,
            logo: center.logo?.trim() || null,
          }

          const updatedCenter = await prisma.center.update({
            where: { id },
            data: updateData,
            include: {
              posts: true,
            }
          })

        return { center: updatedCenter, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}


export async function getById(id: number) {
    try {

        const centerFromDb: Center | null = await prisma.center.findUnique(
            {
                where: { id },
            },
        )
        if (!centerFromDb) {
            return { error: { code: 404 }, message: "not found", ok: false }
        }

        return { center: centerFromDb, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}



export async function deleteById(id: number) {
    try {
        const centerFromDb: Center | null = await prisma.center.delete(
            {
                where: { id },
            },
        )
        if (!centerFromDb) {
            return { error: { code: 404 }, message: "not found", ok: false }
        }
        return { center: centerFromDb, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}



