import Ministration from '../Models/Ministration'
import Patient from '../Models/Patient'
import Medication from '../Models/Medication'

export default class UserController {

    public async getAll(req: any, res: any) {
        try {
            const data = await Ministration.find()

            for(let d of data) {
                let patient = await Patient.findOne({_id: d.patient})
                let medication = await Medication.findOne({_id: d.medication})
                data[data.indexOf(d)] = { ...d._doc, patient, medication }
            }

            return res.json({ data })
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }
    
    public async create(req: any, res: any) {
        //enviar no body do postman
        // {
        //     "dose": "aaa",
        //     "interval": 8,
        //     "medicationFor": "2021-12-01T23:59:00.000",
        //     "medicatedAt": "2021-11-28T23:59:00.000",
        // }


        try {
            let data = req.body

            //salvar id usuario e id medication
            //ver na model

            let limit = new Date(data.medicationFor)
            
            let limitIterator = new Date()
            data.medicatedStory = []

            do {
                data.medicatedStory.push({
                    targetTime: limitIterator, 
                    ministrationTime: data.medicatedStory.length === 0 ? data.medicatedAt : null, 
                    ministrationLate: false,
                    ministrated: data.medicatedStory.length === 0
                })

                limitIterator = new Date(new Date(limitIterator).setHours(limitIterator.getHours() + Number(data.interval))) 
            } while ( limitIterator <= limit)

            // Fazer o create no banco
            await Ministration.create(data)

            return res.json(data)
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async update(req: any, res: any) {

        //enviar no body do postman
        // {
        //     "medicatedAt": "2021-11-28T23:59:00.000"
        // }
        try {
            // buscar do banco
            let data = await Ministration.findOne({_id: req.params.id})

            let it = true
            let iterator = 1

            do {
                if (data.medicatedStory) {
                    if(data.medicatedStory[iterator - 1].ministrated === true && data.medicatedStory[iterator].ministrated === false) {
                        data.medicatedStory[iterator].ministrationLate = new Date(req.body.medicatedAt) <= new Date(data.medicatedStory[iterator].targetTime)
                        data.medicatedStory[iterator].ministrated = true
                        data.medicatedStory[iterator].ministrationTime = new Date(req.body.medicatedAt) 
                        data.medicatedAt = new Date(req.body.medicatedAt) 
                        it = false
                    }
                }

                iterator = iterator + 1
            } while(it)

            await Ministration.updateOne({_id: req.params.id}, data)

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async deleteMinistration(req: any, res: any) {
        try {
            await Ministration.deleteOne({_id: req.params.id})

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

}
