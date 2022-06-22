import Restaurant from '../models/restaurant.js';
import fetch from "node-fetch";
const mapBoxToken = process.env.MAPBOX_TOKEN;

const restaurants = {
  index: async (req, res) => {
    const restaurants = await Restaurant.find({});
    res.render('restaurants/index', { restaurants });
  },
  newRestaurant: (req, res) => {
    res.render('restaurants/new');
  },
  createRestaurant: async (req, res) => {
    const restaurant = new Restaurant(req.body.restaurant);
    await restaurant.save();
    req.flash('success', 'Thank you! The restaurant was added 😌');
    res.redirect(`/restaurants`);
  },
  showRestaurant: async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    res.render('restaurants/show', { restaurant });
  },
  editRestaurant: async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    res.render('restaurants/edit', { restaurant });
  },
  updateRestaurant: async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant });
    res.redirect(`/restaurants/${restaurant._id}`);
  },
  destroyRestaurant: async (req, res) => {
    const { id } = req.params;
    console.log(`1--------------console.log\n${id}\n`)
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants');
  }
}

export default restaurants;