const mongoose = require('../config/database');
const crypto = require('crypto');


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {type: String, required: true},
    cpf: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase:true},
    celphone: {type: String, required: true},
    password: {
        type: String, 
        required: true, 
        select: false,
        set: value => crypto.createHash('md5').update(value).digest('hex')
    },
    office: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})





module.exports = mongoose.model('Users', UserSchema);