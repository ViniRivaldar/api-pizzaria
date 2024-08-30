import { Router } from "express";

import orderController from "../controller/OrderController.js";
import LoginRequired from "../middleware/LoginRequired.js"
import AdminRequired from "../middleware/AdminRequired.js";

const router = new Router()

router.post('/', LoginRequired, orderController.store)
router.get('/', LoginRequired, orderController.index)
router.put('/:id', LoginRequired, AdminRequired, orderController.update)
router.get('/:id', LoginRequired, AdminRequired, orderController.show)
router.delete('/:id', LoginRequired, AdminRequired, orderController.delete)

export default router