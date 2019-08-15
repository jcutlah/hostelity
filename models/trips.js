const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    hostels: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Hostel' 
        }
    ],
    user: {
        type: String
    },
    // destinations: {
    //     type: {
    //         type: String, 
    //         enum: ['MultiPoint'],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [[Number, Number]],
    //         required: true
    //     }
    // },
    startDest: {
        type: [[Number, Number]]
    },
    endDest: {
        type: [Number, Number]
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
