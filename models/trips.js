const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    hostels: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Hostel' 
        }
    ],
    startDest: {
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
    endDest: {
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
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
