import * as express from 'express'
import UserController from '../Controllers/user'

const router = express.Router()

const userController = new UserController()

router.post('/reset-password', userController.resetPassword.bind(userController))

router.post('/', userController.createUser.bind(userController))

router.post('/:id', userController.updateUser.bind(userController))

router.get('/', userController.getAll.bind(userController))

router.delete('/:id', userController.deleteUser.bind(userController))


export default router