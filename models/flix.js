const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,

    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    rating: { type: Number, min: 1, max: 5, default: 1 }
}, {
    timestamps: true
});

const flixSchema = new Schema({

    content: String,
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },

    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        default: function () {
            return new Date().getFullYear();
        }
    },
    mpaaRating: String,
    didEnjoy: { type: Boolean, default: true },
    reviews: [reviewSchema],
    cast: [{ type: Schema.Types.ObjectId, ref: 'Flix' }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Flix', flixSchema);