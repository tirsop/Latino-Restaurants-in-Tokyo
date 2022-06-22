import mongoose from 'mongoose';
mongoose
  .connect('mongodb://localhost:27017/latinoRestaurants')
  .then(() => {
    console.log(`--------------console.log\nDatabase connected\n`);
  })
  .catch((err) => {
    console.log(`--------------console.log\nMONGO CONNECTION ERROR:`);
    console.log(err + `\n`);
  });
import Restaurant from '../models/restaurant.js';

const addRestaurant = async () => {
  await Restaurant.deleteMany({});
  console.log("All restaurants deleted.");
  console.log("Creating new restaurants...");
  await Restaurant.insertMany([
    {
      name: 'Miguel y Juani',
      location: 'Shinjuku',
      country: 'Spanish',
      url: 'https://goo.gl/maps/v1zuSmhJy7jVYPep8',
      image: 'https://tblg.k-img.com/resize/660x370c/restaurant/images/Rvw/60113/60113285.jpg?token=0745494&api=v2',
      geometry: {
        type: "Point",
        coordinates: [
          139.6673575,
          35.6874274,
        ]
      },
    },
    {
      name: 'EL ROSSELLO',
      location: 'Meguro',
      country: 'Spanish',
      url: 'https://goo.gl/maps/BfMftRk9ADCWwxLH8',
      image: 'https://tabelog.com/imgview/original?id=r0234379775327',
      geometry: {
        type: "Point",
        coordinates: [
          139.6840775,
          35.6293508,
        ]
      },
    },
    {
      name: 'Amets',
      location: 'Asakusa',
      country: 'Spanish',
      url: 'https://goo.gl/maps/qZnwv9aaip1nQdb89',
      image: 'https://tabelog.com/imgview/original?id=r9861131790870',
      geometry: {
        type: "Point",
        coordinates: [
          139.7903485,
          35.7112631,
        ]
      },
    },
    {
      name: 'El Chateo',
      location: 'Ginza',
      country: 'Spanish',
      url: 'https://g.page/elchateo-ginza?share',
      image: 'https://tabelog.com/imgview/original?id=r5842889524483',
      geometry: {
        type: "Point",
        coordinates: [
          139.7647241,
          35.6730715,
        ]
      },
    },
    {
      name: 'La Pesquera MARISQUERIA',
      location: 'Otemachi',
      country: 'Spanish',
      url: 'https://g.page/lapesqueramarisqueria?share',
      image: 'https://tabelog.com/imgview/original?id=r93948142018369',
      geometry: {
        type: "Point",
        coordinates: [
          139.7653975,
          35.6855124,
        ]
      },
    },
    {
      name: 'Bar Portillo de sal y amor',
      location: 'Naka-Meguro',
      country: 'Spanish',
      url: 'https://g.page/Bar-Portillo-Nakameguro?share',
      image: 'https://tabelog.com/imgview/original?id=r94855111066603',
      geometry: {
        type: "Point",
        coordinates: [
          139.6976832,
          35.6471239,
        ]
      },
    },
    {
      name: 'La Coquina cervecería',
      location: 'Shibuya',
      country: 'Spanish',
      url: 'https://g.page/LaCoquina?share',
      image: 'https://tabelog.com/imgview/original?id=r66711129935433',
      geometry: {
        type: "Point",
        coordinates: [
          139.7022323,
          35.6583189,
        ]
      },
    },
    {
      name: 'La Cabina',
      location: 'Shibuya',
      country: 'Mexican',
      url: 'https://g.page/lacabinatokyo?share',
      image: 'https://tabelog.com/imgview/original?id=r52706115508974',
      geometry: {
        type: "Point",
        coordinates: [
          139.6956621,
          35.6621231,
        ]
      },
    },
    {
      name: 'Frijoles',
      location: 'Daikanyama',
      country: 'Mexican',
      url: 'https://goo.gl/maps/7uourPg8ednRXFw98',
      image: 'https://tabelog.com/imgview/original?id=r99406119376673',
      geometry: {
        type: "Point",
        coordinates: [
          139.706706,
          35.6486483,
        ]
      },
    },
    {
      name: 'Bépocah',
      location: 'Harayuku',
      country: 'Perú',
      url: 'https://g.page/bepocah?share',
      image: 'https://tabelog.com/imgview/original?id=r5077385697241',
      geometry: {
        type: "Point",
        coordinates: [
          139.7101082,
          35.6724984,
        ]
      },
    },
    {
      name: 'Medellin Yokohama',
      location: 'Yokohama',
      country: 'Colombia',
      url: 'https://goo.gl/maps/UhfhWReTQbooS53PA',
      image: 'https://tabelog.com/imgview/original?id=r5706365472998',
      geometry: {
        type: "Point",
        coordinates: [
          139.5596572,
          35.444148,
        ]
      },
    },
    {
      name: 'Mi Choripan',
      location: 'Yoyogi',
      country: 'Argentina',
      url: 'https://goo.gl/maps/ijZRJcMp4LRLi1jX6',
      image: 'https://tabelog.com/imgview/original?id=r0905886571645',
      geometry: {
        type: "Point",
        coordinates: [
          139.6844185,
          35.6649908,
        ]
      },
    },
  ]);
};
const restTotal = await Restaurant.count();
addRestaurant().then(() => {
  mongoose.connection.close();
  console.log(`${restTotal} restaurants created!`);
});

