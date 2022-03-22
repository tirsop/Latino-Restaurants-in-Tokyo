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
        name: "Miguel y Juani",
        location: "Shinjuku",
        country: "Spanish",
        url: "https://goo.gl/maps/v1zuSmhJy7jVYPep8"
    },
    {
        name: "EL ROSSELLO",
        location: "Meguro",
        country: "Spanish",
        url: "https://goo.gl/maps/BfMftRk9ADCWwxLH8"
    },
    {
        name: "Amets",
        location: "Asakusa",
        country: "Spanish",
        url: "https://goo.gl/maps/qZnwv9aaip1nQdb89"
    },
    {
        name: "El Chateo",
        location: "Ginza",
        country: "Spanish",
        url: "https://g.page/elchateo-ginza?share"
    },
    {
        name: "La Pesquera MARISQUERIA",
        location: "Otemachi",
        country: "Spanish",
        url: "https://g.page/lapesqueramarisqueria?share"
    },
    {
        name: "Bar Portillo de sal y amor",
        location: "Naka-Meguro",
        country: "Spanish",
        url: "https://g.page/Bar-Portillo-Nakameguro?share"
    },
    {
        name: "La Coquina cervecería",
        location: "Shibuya",
        country: "Spanish",
        url: "https://g.page/LaCoquina?share"
    },
    {
        name: "La Cabina",
        location: "Shibuya",
        country: "Mexican",
        url: "https://g.page/lacabinatokyo?share"
    },
    {
        name: "Frijoles",
        location: "Daikanyama",
        country: "Mexican",
        url: "https://goo.gl/maps/7uourPg8ednRXFw98"
    },
    {
        name: "Bépocah",
        location: "Harayuku",
        country: "Perú",
        url: "https://g.page/bepocah?share"
    },
    {
        name: "Medellin Yokohama",
        location: "Yokohama",
        country: "Colombia",
        url: "https://goo.gl/maps/UhfhWReTQbooS53PA"
    },
    {
        name: "Mi Choripan",
        location: "Yoyogi",
        country: "Argentina",
        url: "https://goo.gl/maps/ijZRJcMp4LRLi1jX6"
    }
])