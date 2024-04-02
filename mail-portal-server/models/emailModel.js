const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types;


const Schema = mongoose.Schema;

const emailSchema = new Schema({
     to: {
        type: ObjectId,
        required: true,
        ref:"USER"
    },
    from: {
        type: ObjectId,
        required: true,
        ref:"USER"
    },
    subject: {
        type: String,
        default:"(no subject)",
    },
    body: {
        type: String,
        required: true
    },
    bin: {
        type: Boolean,        
        default:'false',
    },
    starred: {
        type: Boolean,        
        default:'false',
    },
    attachment: {
        type : String,
    },
},{
    timestamps : true
})


const EMAIL = mongoose.model("EMAIL" , emailSchema)
module.exports = EMAIL;