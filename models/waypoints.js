const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wpSchema = new Schema({
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
    tripIndex: {
        type: Number,
        required: true
    },
    location: {
        type: [Number, Number]
    },
    imageUrl: {
        type: String
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});

const Waypoint = mongoose.model("Waypoint", wpSchema);

module.exports = Waypoint;
