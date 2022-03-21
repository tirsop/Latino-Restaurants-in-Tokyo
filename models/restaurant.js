import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String
})

export default mongoose.model('Restaurant', RestaurantSchema); 