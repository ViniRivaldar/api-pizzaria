import { Router } from "express";

import addressController from '../controller/AddressController.js'
import LoginRequired from '../middleware/LoginRequired.js'

const router = new Router()

router.post('/', LoginRequired, addressController.store)
router.put('/', LoginRequired, addressController.update)
router.delete('/', LoginRequired, addressController.delete)

export default router