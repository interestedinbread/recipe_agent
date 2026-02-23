/// <reference path="../types/express.d.ts" />

import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface AuthTokenPayload {
    id: string,
    email: string
}

const jwtSecret = (() => {
    const secret = process.env.JWT_SECRET
    if(!secret){
        return null
    }
    return secret
})()

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    // extract token from request header
    const header = req.headers.authorization
    const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null

    // if there is no token, return a message
    if(!token){
        return res.status(401).json({ message: "JWT token required"})
    }

    if(!jwtSecret){
        return res.status(500).json({ message: "Server misconfiguration: JWT secret not set" })
    }

    try{
    // decode the jwt
    const decoded = await jwt.verify(
        token,
        jwtSecret
    )

    // jwt.verify returns an object for object payloads; reject if it's a string
    if (typeof decoded === 'string') {
        return res.status(400).json({ message: 'Invalid token payload' })
    }

    // store token and type it using the type we defined above
    const payload = decoded as unknown as AuthTokenPayload

    req.user = {
        id: payload.id,
        email: payload.email
    }

    next()

    } catch (err) {
        console.error('Auth middleware error:', err)
        res.status(401).json({ message: "Invalid token" })
    }
}