import { signInController, signUpController, getMeController } from "../controllers/authController";
import { Router } from 'express'
import { signInBodySchema, signUpBodySchema } from "../validation/auth";
import { validate } from "../middleware/validate.middleware";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router()

router.post('/signup', validate(signUpBodySchema), signUpController)
router.post('/signin', validate(signInBodySchema), signInController)
router.get('/get/me', requireAuth, getMeController)

export default router