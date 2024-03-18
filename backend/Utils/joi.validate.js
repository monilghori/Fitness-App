const Joi = require("joi")
const enums = require("../Utils/enums.json")

module.exports = {

    validation4signup : (req, res, next) =>     {
        
        let schema = Joi.object().keys({
            email : Joi.string().required(),
            name : Joi.string().required(),
            password : Joi.string().required(),
            age : Joi.number(),
            gender : Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false , message : error.details[0].message})
        }
        else{
            next()
        }
    },

    validation4login : (req, res, next) => {
        
        let schema = Joi.object().keys({
            email : Joi.string().required(),
            password : Joi.string().required()
        })

        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false, message : error.details[0].message})
        }
        else{
            next()
        }
    },
    validateComment : (req, res, next) => {
        let schema = Joi.object().keys({
            comment : Joi.string().required(),
            postId : Joi.string().required(),
            userId : Joi.string().required()
        })
        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false, message : error.details[0].message})
        }
        else{
            next()
        }
    },
    validate4post : (req, res, next) => {
        let schema = Joi.object().keys({
            description : Joi.string().required(),
            userId : Joi.string().required()
        })
        let { error } = schema.validate(req.body)

        if(error)
        {
            return res
                    .status(enums.HTTP_CODE.BAD_REQUEST)
                    .json({success : false, message : error.details[0].message})
        }
        else{
            next()
        }
    }
}