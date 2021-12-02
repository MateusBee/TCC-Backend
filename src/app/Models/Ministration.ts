const mongoose = require('../../database')

const MedicationSchema = new mongoose.Schema({
	patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  medication: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medication'
  },
	dose: String,
  interval: Number, // a cada quantas horas
  medicationFor: Date, // Dia do fim da medicação
  medicatedAt: Date, // Salva apenas a ultima, mas duplica para story
  instructions: String,
  medicatedStory: [
    {
      targetTime: Date, // É criado após a primeira medicação com o calculo baseado na hora que tomou, quantas horas e doses possui
      ministrationTime: Date, // Marca ao se medicar
      ministrationLate: Boolean, // Marca ao tomar atrasado
      ministrated: Boolean // medicamento ja foi ministrado
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Medication = mongoose.model('Ministration', MedicationSchema)

export default Medication
