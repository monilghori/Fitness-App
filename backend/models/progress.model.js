const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    exerciseDuration: { type: Number },
    calories: { type: Number },
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true }
}, {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
});

progressSchema.pre('save', function(next) {
    const doc = this;
    // Set the time to 00:00:00, effectively ignoring time part for storage
    const dateOnly = new Date(doc.date);
    dateOnly.setHours(0, 0, 0, 0); // Resets hours, minutes, seconds, and milliseconds
    doc.date = dateOnly;
    next();
});

const progress = mongoose.model("progress", progressSchema, "progress");
module.exports = progress;
