const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        comment : {type : String ,  required: true},
        user: { type : mongoose.Types.ObjectId , ref:"user" },
        post : {type : mongoose.Types.ObjectId , ref:"post" },
    },
    {
        timestamps: true,
		versionKey: false,
		autoCreate: true,
    }
)

const comment = new mongoose.model("comment", commentSchema,"comment");
module.exports= comment;