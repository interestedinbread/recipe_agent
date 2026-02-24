import { prisma } from "../lib/prisma";



export const listByUserId = (userId: string) => {
    const pantryItems = prisma.pantryItem.findMany({
        where: {
            userId: userId
        }
    })

    return pantryItems
}

export const createPantryItem = (
    userId: string, 
    data: 
        {displayName: string, 
        canonicalName: string, 
        category: string}
    ) => {
        const newPantryItem = prisma.pantryItem.create({
            data: {
                userId: userId,
                displayName: data.displayName,
                canonicalName: data.canonicalName,
                category: data.category
            }
        })

        return newPantryItem
    }

    export const deletePantryItem = async (itemId: string, userId: string) => {
        const item = await prisma.pantryItem.findUnique({
            where: {
                id: itemId
            }
        })
        if(!item){
            throw new Error('Item not found')
        } else if (item.userId !== userId){
            throw new Error('Unauthorized')
        } else {
            try{
                const result = await prisma.pantryItem.delete({
                    where: {
                        id: itemId
                    }
                })
    
                return result
            } catch (err) {
                throw new Error('Error deleting item', { cause: err })
            }
        }


    }