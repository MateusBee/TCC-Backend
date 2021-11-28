import * as express from 'express'
import PatientController from '../Controllers/patient'

const router = express.Router()

const patientController = new PatientController()

router.post('/', patientController.createPatient.bind(patientController))

router.post('/:id', patientController.updatePatient.bind(patientController))

router.post('/:id/medication', patientController.updateMedication.bind(patientController))

router.get('/', patientController.getAll.bind(patientController))

router.delete('/:id', patientController.deletePatient.bind(patientController))

export default router