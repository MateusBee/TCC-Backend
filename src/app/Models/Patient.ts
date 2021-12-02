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
	url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Patient = mongoose.model('Patient', PatientSchema)

export default Patient
