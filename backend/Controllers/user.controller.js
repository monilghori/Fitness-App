const userSchema = require('../models/user.model')
const enums = require('../Utils/enums.json')
const messages = require("../utils/messages.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");	


module.exports = {

    createUser : async (req, res) => {
        const {name, email, password, age, gender} = await req.body

        try{
            const user = await userSchema.findOne({email : email})

            if(user)
            {
                return res  
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false, message : messages.USER_EXIST})
            }
            if(age < 10)
            {
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false, message : messages.AGE_VALIDATION})
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)

            const data = {
                email,
                name,
                password : hash,
                age,
                gender
            }

            const userdata = await userSchema.create(data)

            if(userdata)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message: messages.SIGNUP_SUCCESS})
            }
            else
            {
                return res
                        .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
                        .json({ success : false ,message : messages.FAILED})
            }
        }
        catch(err)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false, message : err.message})
        }
        
    },

    userLogin: async (req, res) => {
		const { email, password } = req.body;
		try {
			const userData = await userSchema.findOne({ email: email})
			if (!userData) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success	: false, message: messages.USER_NOT_FOUND });
			}
			const userPassword = userData.password;
			const isMatch = await bcrypt.compare(password, userPassword);
			if (!isMatch) {
				return res
					.status(enums.HTTP_CODE.BAD_REQUEST)
					.json({ success: false, message: messages.NOT_MATCH });
			}

			const data = {
				id: userData._id,
				email: userData.email,
                name : userData.name,
                age : userData.age
			};
            
			const token = jwt.sign(data, process.env.JWT_SECRET);
			return res
				.status(enums.HTTP_CODE.OK)
				.json({ success: true, message: messages.LOGIN_SUCCESS, token, user: userData });
		} catch (error) {
			return res
				.status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
				.json({ success: false, message: error.message });
		}
	}
}
