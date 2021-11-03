const mongoose = require('../../database')

const FileSchema = new mongoose.Schema({
	name: String,
	url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const File = mongoose.model('File', FileSchema)

export default File
