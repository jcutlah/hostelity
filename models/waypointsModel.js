const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wpSchema = new Schema({
    hostels: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Hostel' 
        }
    ],
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trips'
    },
    name: {
        type: String,
        required: true
    },
    tripIndex: {
        type: Number,
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
            required: true,
            index: true
        }
    },
    imageUrl: {
        type: String
    },
    dateAdded: { 
        type: Date, 
        default: Date.now 
    }
});
wpSchema.index({ 'location': '2dsphere' }, { background: false });

const Waypoint = mongoose.model("Waypoint", wpSchema);

module.exports = Waypoint;
