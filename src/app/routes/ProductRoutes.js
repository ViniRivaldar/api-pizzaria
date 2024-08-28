import { Router } from "express";

import productController from "../controller/ProductController.js";
import LoginRequired from '../middleware/LoginRequired.js'
import AdminRequired from "../middleware/AdminRequired.js";

const router = new Router()

router.post('/',LoginRequired, AdminRequired,productController.store)
router.get('/',productController.index)
router.get('/:id',productController.show)
router.put('/:id',LoginRequired, AdminRequired,productController.update)
router.delete('/:id',LoginRequired, AdminRequired,productController.delete)

export default router