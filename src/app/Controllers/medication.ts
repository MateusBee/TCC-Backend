import Medication from '../Models/Medication'

export default class UserController {

    public async getAll(req: any, res: any) {
        try {
            const data = await Medication.find()

            return res.json({ data })
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }
    
    public async createMedication(req: any, res: any) {
        try {

            await Medication.create(req.body)

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async updateMedication(req: any, res: any) {
        try {

            await Medication.updateOne({_id: req.params.id}, req.body)

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async deleteMedication(req: any, res: any) {
        try {
            await Medication.deleteOne({_id: req.params.id})

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

}
