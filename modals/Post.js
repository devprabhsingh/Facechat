const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user_id:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
    },
    img:{
        type:Buffer
    },
    imgType:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    likes:{
        type:Number
    }
})

module.exports = mongoose.model('Post',PostSchema);