import { Router } from "express";

import categoryController from '../controller/CategoryController.js'
import LoginController from '../middleware/LoginRequired.js'
import AdminRequired from '../middleware/AdminRequired.js'

const router = new Router()

router.post('/', LoginController, AdminRequired, categoryController.store)
router.get('/',  categoryController.index)
router.put('/:id', LoginController, AdminRequired, categoryController.update)
router.delete('/:id', LoginController, AdminRequired, categoryController.delete)


export default router