import * as express from 'express'
import FileController from '../Controllers/file'

const router = express.Router()

const fileController = new FileController()

router.post('/', fileController.createFile.bind(fileController))

router.get('/', fileController.getAll.bind(fileController))

router.delete('/:id', fileController.deleteFile.bind(fileController))

export default router