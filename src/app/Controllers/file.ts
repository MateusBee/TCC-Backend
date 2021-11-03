import File from '../Models/File'

export default class UserController {

    public async getAll(req: any, res: any) {
        try {
            const data = await File.find()

            return res.json({ data })
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }
    
    public async createFile(req: any, res: any) {
        try {

            await File.create(req.body)

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async deleteFile(req: any, res: any) {
        try {
            await File.deleteOne({_id: req.params.id})

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

}
