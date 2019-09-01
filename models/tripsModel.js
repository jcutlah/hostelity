const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    waypoints: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Waypoint' 
        }
    ],
    start: {
        type: String
    },
    end: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    totalMileage: {
        type: Number,
        required: true
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
