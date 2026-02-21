import { signUpService, signInService } from "../services/authService";
import type { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
    try {
        const result = await signUpService(req.body)
        res.status(200).json({ user: result.user, token: result.token })
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unkown error occurred"
        res.status(400).json({ error: message })
    }
}

export const signInController = async (req: Request, res: Response) => {
    try{
        const result = await signInService(req.body)
        res.status(200).json({ user: result.user, token: result.token })
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknow error occurred"
        res.status(400).json({ error: message})
    }
}