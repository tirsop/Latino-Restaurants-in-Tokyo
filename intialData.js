import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/latinoRestaurants')
    .then(() => {
        console.log(`--------------console.log\nDatabase connected\n`)
    })
    .catch(err => {
        console.log(`--------------console.log\nMONGO CONNECTION ERROR:`)
        console.log(err + `\n`)
    })
import Restaurant from '../models/restaurant.js';

Restaurant.insertMany([
    {
        name: Miguel y Juani,
        location: Shinjuku,
        country: Spanish,
        url: https://goo.gl/maps/v1zuSmhJy7jVYPep8
    }
])