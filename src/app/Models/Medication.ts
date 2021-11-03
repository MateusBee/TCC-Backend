const mongoose = require('../../database')

const MedicationSchema = new mongoose.Schema({
	name: String,
	form: String,
	type: String,
	url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Medication = mongoose.model('Medication', MedicationSchema)

export default Medication
