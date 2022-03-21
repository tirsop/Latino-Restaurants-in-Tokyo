console.log(`\n\n\n\n\n\n\n\n\n
******************************************************************`);

import { names1, names2, locations } from './seeds.js';            // import seed helpers
import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/latinoRestaurants')
    .then(() => {
        console.log(`--------------console.log\nDatabase connected\n`)
    })
    .catch(err => {
        console.log(`--------------console.log\nMONGO CONNECTION ERROR:`)
        console.log(err + `\n`)
    })
import Restaurant from '../models/restaurant.js';                // import mongoose model created inside models folder




// function that returns a random element of an array
const ramArray = array => array[Math.floor(Math.random() * array.length)];

// first delete content of db, then randomly generates seeds from an external file
const seedDB = async () => {
    await Restaurant.deleteMany({});
    for (let i = 0; i < 20; i++) {                               // 20 bc I want 20 seeds
        const ramPrice = Math.floor(Math.random() * 8000) + 1000;
        const restaurant = new Restaurant({
            title: `${ramArray(names1)} ${ramArray(names2)}`,
            location: `${ramArray(locations)}`,
            price: ramPrice,
            description: 'When it comes to paella, you cannot go more real than this restaurant. At least in Tokyo.',
            image: 'https://homecookingadventure.com/images/recipes/chicken_chorizo_paella_main.jpg'
        })
        await restaurant.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});

