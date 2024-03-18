const enums = require("../Utils/enums.json");
const messages = require("../utils/messages.json");
const progressSchema = require("../models/progress.model")

module.exports = {
    addProgress : async (req, res) => {
        const { date, weight, exerciseDuration, calories, user} = req.body
        try{
            const info = {
                date,
                weight,
                exerciseDuration,
                calories,
                user
            }

            const data = await progressSchema.create(info)

            if(data)
            {
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : messages.SUCCESS})
            }
            else{
                return res
                        .status(enums.HTTP_CODE.BAD_REQUEST)
                        .json({success : false, message : messages.FAILED})
            }
        }catch (err) {
            return res
              .status(enums.HTTP_CODE.BAD_REQUEST)
              .json({ success: false, message: err.message });
          }
    },

    getProgress : async (req, res) => {
        const { userId } = req.body

        try{
            const data = await progressSchema.find({user : userId}).sort({ date: 1 })

            // if(data.length == 0)
            // {
            //     return res
            //             .status(enums.HTTP_CODE.BAD_REQUEST)
            //             .json({success : false, message : messages.FAILED})
            // }
            // else{
                return res
                        .status(enums.HTTP_CODE.OK)
                        .json({success : true, message : messages.SUCCESS, progress : data})
            // }

        }
        catch (err) {
            return res
                .status(enums.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: err.message });
        }
    }
}