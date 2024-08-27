import { Router } from "express";

import loginController from '../controller/LoginController.js'

const router = new Router()

router.post('/',loginController.store)

export default router