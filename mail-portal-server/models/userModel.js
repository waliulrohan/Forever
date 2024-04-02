const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8p7GfNOdWUuoaLYF6Ous6cvnUShb3HEDpQg5vXxdgAs50fnyuOyzGmqikWsI4VMk6z24&usqp=CAU",
    },
    bio:{
        type: String,
        default: "I am a forever-mail user...🫠"
    },
});


const USER = mongoose.model("USER" , userSchema)
module.exports  = USER;

