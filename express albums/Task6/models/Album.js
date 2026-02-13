import { Schema, model } from 'mongoose'

const albumSchema = new Schema({
    artist: {
        type: String,
        required: true,
        minLength: [3, "Min length is 3"],
        maxLength: [50, "Max length is 50"]
    },
    title: {
        type: String,
        required: true,
        minLength: [3, "Min length is 3"],
        maxLength: [50, "Max length is 50"]
    },
    year: {
        type: Number,
        required: true,
        min: [1900, "Album has to have come out after 1900"],
        max: [Date.now.year, "Album can't have come out in the future"]
    },
    genre: {
        type: String,
        enum: {
            values: ["Pop", "Jazz Rock", "Jazz", "Folk Rock"],
            message: '{VALUE} not available'
        }
    },
    tracks: {
        type: Number,
        min: [0, "Track count can't be below 0"],
        max: [100, "Max allowed tracks is 100"]
    }
})

albumSchema.virtual('fullTitle').get(function() {
    return this.artist + ' - ' + this.title + ' - ' + this.year
})

albumSchema.methods.getDecade = function() {
    const year = this.year
    const tens = Math.floor(year/10) % 10

    return `${tens}0s`
}

export default model("Album", albumSchema)