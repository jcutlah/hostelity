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
            type: [Number],
            required: true
          }
    },
    address: {
        type: String
    },
    placeId: {
        type: String
    },
    imageUrl: {
        type: String
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Hostel = mongoose.model("Hostel", hostelSchema);

module.exports = Hostel;
