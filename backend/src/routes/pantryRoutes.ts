import { listPantryItemsController, createPantryItemController, deletePantryItemController } from "../controllers/pantryController";
import { requireAuth } from "../middleware/auth.middleware";
import { validate, validateParams } from "../middleware/validate.middleware";
import { createPantryItemSchema, deletePantryItemSchema } from "../validation/pantry";
import { Router } from 'express'

const router = Router()

router.get('/list', requireAuth, listPantryItemsController)
router.post('/create', requireAuth, validate(createPantryItemSchema), createPantryItemController)
router.delete('/:id', requireAuth, validateParams(deletePantryItemSchema), deletePantryItemController)

export default router