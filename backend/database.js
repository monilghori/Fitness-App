const mongoose = require('mongoose')

const db = mongoose.connect("mongodb+srv://drsuvagiya11:dhruv11@project.fvy7zua.mongodb.net/").catch((err) => {console.log(err)})

module.exports = db;