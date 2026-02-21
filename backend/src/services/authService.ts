import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { signUpBody, signInBody } from '../validation/auth'
import { prisma } from '../lib/prisma'


const jwtSecret = (() => {
    const secret = process.env.JWT_SECRET
    if(!secret){
        throw new Error("No jwt secret found")
    }
    return secret
})()

export const signUpService = async (input: signUpBody) => {
    // check to see if email is already registered
    const existing = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    })

    // if email is already registered, throw error
    if(existing){
        throw new Error('Email is already registered.')
    }

    // hash the password
    const passwordHash = await bcrypt.hash(input.password, 10)

    // run prisma query
    const user = await prisma.user.create({
        data: {
            email: input.email,
            passwordHash: passwordHash
        }
    })

    // issue JWT 
    const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "1h"}
    )

    const returnedUser = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt.toISOString()
    }

    return { user: returnedUser, token}
}

export const signInService = async (input: signInBody) => {
    // use email to find user with prisma query
    const user = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    })
    // if there is no user with that email, throw error
    if(!user){
        throw new Error('User not found')
    }

    // if we make it here, there is a valid user. 
    // Check the user password against the input password.
    
    const matched = await bcrypt.compare(input.password, user.passwordHash)

    // if the password does not match then throw an error
    if(!matched){
        throw new Error('Incorrect username or password')
    }

    // if we make it here then we have a valid password
    // issue jwt

    const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtSecret,
        { expiresIn: "1h" }
    )

    const returnedUser = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt.toISOString()
    }

    return { user: returnedUser, token }

}