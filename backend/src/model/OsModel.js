const mongoose = require('../config/database');

const Schema = mongoose.Schema;

const OsSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    city: {type: String, required: true},
    when: {type: Date, required: true},
    done: {type: Boolean, default: false},
    user_id: {type: String, required: true},
    created: {type: Date, default: Date.now()}
})


module.exports = mongoose.model('OS', OsSchema);