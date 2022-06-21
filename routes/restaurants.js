import express from 'express';
const router = express.Router();
import Restaurant from '../models/restaurant.js';
import catchAsync from '../utils/catchAsync.js';            // try and catch errors in async functions
import { validateRestaurant } from '../middleware.js';              // what to do if user is not authenticate




// Index page, list of all items. 
router.get('/', catchAsync(async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.render('restaurants/index', { restaurants });
}))
// Creates new item. 1st display a form (/new) and then post request to save the item (req.body) in the db
router.get('/new', (req, res) => {
  res.render('restaurants/new');
})
router.post('/', validateRestaurant, catchAsync(async (req, res) => {
  const restaurant = new Restaurant(req.body.restaurant);
  await restaurant.save();
  req.flash('success', 'Thank you! The restaurant was added 😌');
  res.redirect(`/restaurants`);
}))
// Show the details of each item finding them by id
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  res.render('restaurants/show', { restaurant });
}))
// Updates/edit item. 1st shows pre-filled form, then updates value & redirect to show-details page.
router.get('/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  res.render('restaurants/edit', { restaurant });
}))
router.put('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant });
  res.redirect(`/restaurants/${restaurant._id}`);
}))
// Delete an item by taking its id. 'Delete'button is at the show.ejs
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(`1--------------console.log\n${id}\n`)
  await Restaurant.findByIdAndDelete(id);
  res.redirect('/restaurants');
}))


export default router;