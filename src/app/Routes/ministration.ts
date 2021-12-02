import * as express from 'express'
import MinistrationController from '../Controllers/ministration'

const router = express.Router()

const ministrationController = new MinistrationController()

router.get('/', ministrationController.getAll.bind(ministrationController))

router.post('/', ministrationController.create.bind(ministrationController))

router.post('/:id', ministrationController.update.bind(ministrationController))

export default router