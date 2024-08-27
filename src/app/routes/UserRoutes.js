import { Router } from "express";

import userController from '../controller/UserController.js'
import LoginRequired from "../middleware/LoginRequired.js";

const router = new Router()

router.post('/', userController.store)
router.put('/', LoginRequired, userController.update)
router.delete('/', LoginRequired, userController.delete)


export default router