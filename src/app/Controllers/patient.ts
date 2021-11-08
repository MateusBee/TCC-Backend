import PatientService from '../patient/patientService'
import Patient from '../Models/Patient'
import Address from '../Models/Address'

export default class PatientController {
    private _patientService: any

    constructor() {
        this._patientService = new PatientService()
    }

    public async getAll(req: any, res: any) {
        try {
            const patients = await Patient.find()

            for(let d of patients) {
                let address = await Address.findOne({userId: d._id})
                patients[patients.indexOf(d)] = { ...d._doc, address }
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

    public async getPatient(req: any, res: any) {
        try {
            let patient = await this._patientService.get(req.params.id)

            return res.json({patient})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async getPatientByUser(req: any, res: any) {
        try {
            let patient = await this._patientService.getByUser(req.params.userid)
            return res.json({patient})
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