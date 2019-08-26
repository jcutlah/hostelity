const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    hostels: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Hostel' 
        }
    ],
    name: {
        type: String,
        required: true
    },
    startDest: {
        name: {
            type: String
        },
        location: {
            type: [Number, Number]
        }
    },
    endDest: {
        name: {
            type: String
        },
        location: {
            type: [Number, Number]
        }
    },
    wayPoints: [
        {
            location: {
                type: [Number, Number]
            },
            name: {
                type: String
            } 
        }
    ],
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
