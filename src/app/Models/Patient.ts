const mongoose = require('../../database')

const PatientSchema = new mongoose.Schema({
	name: String,
	cpf: String,
	birth: Date,
	age: Number,
	weight: String,
	height: String,
	phone: String,
	comments: String,
	medication: [
		{
			medication_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Medication'
			},
			dose: String,
			break_schedule: String, //intervalo intrajornada
			instructions: String,
			treatment: [
				{
					main_date: Date, //data/hora que deveria tomar
					medicate_date: Date, //data/hora em que tomou
					medicated: {
						type: Boolean,
						default: false
					} // tomou no dia
				}
			],
		}
	],
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Patient = mongoose.model('Patient', PatientSchema)

export default Patient
