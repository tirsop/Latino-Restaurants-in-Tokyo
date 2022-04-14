console.log(`\n\n\n\n\n\n\n\n\n
******************************************************************`);

import express from 'express';                                  //import express package
import path from 'path';
import { URL } from 'url';
const __dirname = new URL('.', import.meta.url).pathname;
import methodOverride from 'method-override';             // for using put/patch request in the html forms
import ejsMate from 'ejs-mate';
import catchAsync from './utils/catchAsync.js';            // try and catch errors in async functions
import ExpressError from './utils/ExpressError.js';        // throw an error with custome statusCode and msg
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/latinoRestaurants')
  .then(() => {
    console.log(`--------------console.log\nDatabase connected\n`)
  })
  .catch(err => {
    console.log(`--------------console.log\nMONGO CONNECTION ERROR:`)
    console.log(err + `\n`)
  })
import Restaurant from './models/restaurant.js';                // import mongoose model created inside models folder
import restaurantSchema from './schemas.js';           // JOI schema used to validate new/updated camps in the server side


const app = express();                                          // abbreviation of the code
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');                                  // for requiring ejs files.
app.use(express.urlencoded({ extended: true }))           // need this line to use req.body.  use runs a function in every single request. 
app.use(methodOverride('_method'));                       // to use PUT, PATCH, DELETE requests in html forms


// Function that validates new/updated items in the server side. Uses JOI schema and imports "schemas.js" file
const validateRestaurant = (req, res, next) => {
  const { error } = restaurantSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join('.');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}


// Index page, list of all items. 
app.get('/restaurants', catchAsync(async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.render('restaurants/index', { restaurants });
}))
// Creates new item. 1st display a form (/new) and then post request to save the item (req.body) in the db
app.get('/restaurants/new', (req, res) => {
  res.render('restaurants/new');
})
app.post('/restaurants', catchAsync(async (req, res) => {
  const restaurant = new Restaurant(req.body.restaurant);
  await restaurant.save();
  res.redirect(`/restaurants/${restaurant._id}`);
}))
// Show the details of each item finding them by id
app.get('/restaurants/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  res.render('restaurants/show', { restaurant });
}))
// Updates/edit item. 1st shows pre-filled form, then updates value & redirect to show-details page.
app.get('/restaurants/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findById(id);
  res.render('restaurants/edit', { restaurant });
}))
app.put('/restaurants/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant });
  res.redirect(`/restaurants/${restaurant._id}`);
}))
// Delete an item by taking its id. 'Delete'button is at the show.ejs
app.delete('/restaurants/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(`1--------------console.log\n${id}\n`)
  await Restaurant.findByIdAndDelete(id);
  res.redirect('/restaurants');
}))

// all: for all types of request. *: for any url which is not above ones
app.all('*', (req, res, next) => {
  next(new ExpressError('Page not found', 404));
})
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh no, Something went wrong!'
  res.status(statusCode).render('error', { err });
})

const port = 3000;
app.listen(port, () => {
  console.log(`--------------console.log\nListening at:\nhttp://localhost:${port}\n`);
})
