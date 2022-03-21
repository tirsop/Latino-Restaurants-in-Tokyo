import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
        enum: ['Spanish', 'Mexican', 'Peruvian', 'Ohter']
    },
    url: {
        type: String,
        required: true
    },
    image: String,
})

export default mongoose.model('Restaurant', RestaurantSchema); 