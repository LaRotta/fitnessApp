const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    favoritewebsite: {
        type: String
    },
    location: {
        type: String
    },
    skills: {
        // the square brackets allow for multiple values separated by a comma. 
        type: [String]
    },
    bio: {
        type: String
    },
    experince: [{
        years: {
            type: Number
        },
        injuries: {
            type: [String]
        },
        achievements: {
            type: [String]
        },
    }, ],
    goals: [{
        currentweight: {
            type: Number
        },
        goalweight: {
            type: Number
        },
        currentmeasurement: {
            type: Number
        },
        goalmeasurement: {
            type: Number
        },
        goalexercises: {
            type: [String]
        }
    }],
});