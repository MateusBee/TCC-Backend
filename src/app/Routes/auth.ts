import * as express from 'express'
import AuthController from '../Controllers/auth'

const router = express.Router()

const authController = new AuthController()

router.post('/authenticate', authController.authenticate.bind(authController))

router.post('/forgot-password', authController.forgotPassword.bind(authController))

router.post('/reset-password', authController.resetPassword.bind(authController))

export default router