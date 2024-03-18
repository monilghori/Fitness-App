const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        description : { type : String, required: true},
        user : {type : mongoose.Types.ObjectId , ref:"user", required: true},
        like : {type : Number, default : 0},
        commentCount : {type : Number,default :0}
    },
    {
        timestamps: true,
		versionKey: false,
		autoCreate: true,
    }
)

const post = new mongoose.model("post", postSchema, "post")
module.exports = post;