import * as express from 'express'
import MedicationController from '../Controllers/medication'

const router = express.Router()

const medicationController = new MedicationController()

router.post('/', medicationController.createMedication.bind(medicationController))

router.post('/:id', medicationController.updateMedication.bind(medicationController))

router.get('/', medicationController.getAll.bind(medicationController))

router.delete('/:id', medicationController.deleteMedication.bind(medicationController))

export default router