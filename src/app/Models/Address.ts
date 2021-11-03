const mongoose = require('../../database')

const AddressSchema = new mongoose.Schema({
    userId: {
        type: String,
        select: false
    },
    cep: String,
    street: String,
    neighborhood: String,
    city: String,
    number: String,
    complement: String,
})

const Address = mongoose.model('Address', AddressSchema)

export default Address
