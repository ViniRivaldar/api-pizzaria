import { Router } from "express";

import orderController from '../controller/OderController.js'
import LoginRequired from '../middleware/LoginRequired.js'

const router = new Router()

router.post('/',LoginRequired, orderController.store)
router.get('/',LoginRequired, orderController.index)
router.get('/:id',LoginRequired, orderController.show)
router.put('/:id',LoginRequired, orderController.update)
router.delete('/:id',LoginRequired, orderController.delete)

export default router