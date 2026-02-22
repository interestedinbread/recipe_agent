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
})

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    // extract token from request header
    const header = req.headers.authorization
    const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : null

    // if there is no token, return a message
    if(!token){
        return res.status(401).json({ message: "JWT token required"})
    }

    try{
    // decode the jwt
    const decoded = jwt.verify(
        token,
        jwtSecret
    )

    // if it's not a string, return a message
    if(typeof decoded !== 'string'){
        return res.status(400).json({ message: 'String expected'})
    }

    // store token and type it using the type we defined above

    const payload = decoded as AuthTokenPayload

    req.user = {
        id: payload.id,
        email: payload.email
    }

    next()

    } catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }
}