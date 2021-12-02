import Patient from '../Models/Patient'
import Address from '../Models/Address'
import Medication from '../Models/Medication'
import Ministration from '../Models/Ministration';

export default class PatientController {

    public async getAll(req: any, res: any) {
        try {
            const patients = await Patient.find()

            for(let d of patients) {
                let address = await Address.findOne({userId: d._id})
                let ministration = await Ministration.findOne({patient: d._id})
                if (ministration) {
                    ministration.medication = await Medication.findOne({_id: ministration.medication})
                }
                patients[patients.indexOf(d)] = { ...d._doc, address, medication: ministration }
            }

            return res.json({ data: patients })

        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }
    
    public async createPatient(req: any, res: any) {
        try {
            const address = req.body.address
            const info = req.body
            delete info.address

            let patient = await Patient.create(info)
            let ad = await Address.create({ userId: patient.id, ...address })

            return res.json({
                patient,
                address: ad, 
            })
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async updatePatient(req: any, res: any) {
        try {
            const address = req.body.address
            const info = req.body
            delete info.address

            await Patient.updateOne({_id: req.params.id}, info)
            await Address.updateOne({_id: address._id}, address)

            let patient = await Patient.findOne({_id: req.params.id})
            let ad = await Address.findOne({_id: address._id})

            return res.json({ patient: { ...patient._doc, address: ad }})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async updateMedication(req: any, res: any) {
        try {

            await Patient.updateOne({_id: req.params.id}, req.body)

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async deletePatient(req: any, res: any) {
        try {
            await Patient.deleteOne({_id: req.params.id})
            await Address.deleteOne({userId: req.params.id})

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }
}