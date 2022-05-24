const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let adSchema = new Schema({
    _id: {type: String },
    title: {type: String, require: true},
    photos: { data: Buffer, contentType: String},
    description: {type: String, require: true},
    number: {type: String, require: true},
    name: {type: String, require: true},
    login: {type: String, require: true},
    date: {type: Date, require: true},
    u_id: {type: mongoose.Types.ObjectId, require: true}
},{
    collection: 'test_ad'
});

let Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;