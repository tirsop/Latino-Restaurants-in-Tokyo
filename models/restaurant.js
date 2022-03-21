import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    title: String,
    location: String,
    image: String,
    url: String
})

export default mongoose.model('Restaurant', RestaurantSchema); 