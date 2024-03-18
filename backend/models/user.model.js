const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
        email : {type : String},
        name : {type : String},
        password : {type : String},
		age : { type : Number},
		gender : { type : String}
    },
	{
		timestamps: true,
		versionKey: false,
		autoCreate: true,
	})

const user = new mongoose.model('user', userSchema, 'user')
module.exports = user