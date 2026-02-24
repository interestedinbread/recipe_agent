import { z } from 'zod'

// set up schema for create
export const createPantryItemSchema = z.object({
    displayName: z.string(),
    canonicalName: z.string(),
    category: z.string()
})

// set up schema for delete

export const deletePantryItemSchema = z.object({
    id: z.string()
})

export type createPantryItemInput = z.infer<typeof createPantryItemSchema>
export type deletePantryItemInput = z.infer<typeof deletePantryItemSchema>