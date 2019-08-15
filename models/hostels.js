const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hostelSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number, Number],
            required: true
        }
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;
