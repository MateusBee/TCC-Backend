import * as express from 'express'
import AuthRouter from '../app/Routes/auth'
import UserRouter from '../app/Routes/user'
import MedicationRouter from '../app/Routes/medication'
import FileRouter from '../app/Routes/file'
import PatientRouter from '../app/patient/patientRouter'
import HealthcheckRouter from './healthcheck'

const authMiddleware = require('../middlewares/auth')
const router = express.Router()

router.use('/version', HealthcheckRouter)

router.use('/auth', AuthRouter)

// Authentication verify
//router.use(authMiddleware)

// Rotas que precisam estar autenticadas
//router.use('/patient', PatientRouter)

router.use('/user', UserRouter)

router.use('/medication', MedicationRouter)

router.use('/file', FileRouter)

export = router