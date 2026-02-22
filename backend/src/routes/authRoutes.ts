import { signInController, signUpController } from "../controllers/authController";
import { requireAuth } from "../middleware";
import { Router } from 'express'

const router = Router()

router.post('/signup', requireAuth, signUpController)
router.post('/signin', requireAuth, signInController)

export default router