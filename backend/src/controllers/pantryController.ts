import { listByUserId, createPantryItem, deletePantryItem } from "../services/pantryService";
import { Request, Response } from "express";

export const listPantryItemsController = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.id
        if(!userId){
            throw new Error('User Id required')
        }

        const pantryItems = await listByUserId(userId)
        return res.status(200).json(pantryItems)

    } catch (err) {
        // this is too verbose, we will clean all this up later with centralized error handling
        const message = err instanceof Error ? err.message : "Internal server error"
        const status = message === "User Id required" ? 401 : 500
        const body = status === 500 ? "Internal server error" : message
        return res.status(status).json({ error: body})
    }
}

export const createPantryItemController = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.id
        if(!userId){
            throw new Error('User Id required')
        }

        const { displayName, canonicalName, category } = req.body
        const result = await createPantryItem(userId, {displayName, canonicalName, category})
        return res.status(201).json(result)
    } catch (err) {
        const message = err instanceof Error ? err.message : "Internal server error"
        const status = message === "User Id required" ? 401 : 500
        const body = status === 500 ? "Internal server error" : message
        return res.status(status).json({ error: body})
    }
}

export const deletePantryItemController = async () => {

}