import { signInController, signUpController } from "../controllers/authController";
import { Router } from 'express'

const router = Router()

router.post('/signup', signUpController)
router.post('/signin', signInController)

export default router