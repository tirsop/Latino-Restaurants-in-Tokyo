console.log(`\n\n\n\n\n\n\n\n\n
******************************************************************`);

import 'dotenv/config';
import express from 'express';                                  //import express package
import path from 'path';
import { URL } from 'url';
import session from 'express-session';
import flash from 'connect-flash';
const __dirname = new URL('.', import.meta.url).pathname;
import methodOverride from 'method-override';             // for using put/patch request in the html forms
import ejsMate from 'ejs-mate';
import catchAsync from './utils/catchAsync.js';            // try and catch errors in async functions
import ExpressError from './utils/ExpressError.js';        // throw an error with custome statusCode and msg
import restaurantRoutes from './routes/restaurants.js'
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/latinoRestaurants')
  .then(() => {
    console.log(`--------------console.log\nDatabase connected\n`)
  })
  .catch(err => {
    console.log(`--------------console.log\nMONGO CONNECTION ERROR:`)
    console.log(err + `\n`)
  })


const app = express();                                          // abbreviation of the code
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');                                  // for requiring ejs files.
app.use(express.urlencoded({ extended: true }))           // need this line to use req.body.  use runs a function in every single request. 
app.use(methodOverride('_method'));                       // to use PUT, PATCH, DELETE requests in html forms
app.use(express.static(path.join(__dirname, 'public')));          // serve the public's folder assets

const secret = process.env.SECRET || 'thisshouldbeabettersecret'
const sessionConfig = {
  // store: MongoStore.create({
  //   mongoUrl: dbUrl,
  //   secret,
  //   touchAfter: 24 * 3600 // time period in seconds
  // }),
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,    // session expiration time
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(flash());
app.use((req, res, next) => {                             // creation of local variables accesible from all templates
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})




app.use('/restaurants', restaurantRoutes);

app.get('/', (req, res) => {
  res.redirect('/restaurants');
})

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
