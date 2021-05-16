const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    email:{
        type:String,
        required:true,
        min:13,
        max:40
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6
    },
    dob:{
        type:String
    },
    bio:{
        type:String
    },
    profileImg:{
        type:Buffer
    },
    profileImgType:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',UserSchema);