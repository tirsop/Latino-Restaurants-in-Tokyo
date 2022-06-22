import express from 'express';
import catchAsync from '../utils/catchAsync.js';
import { validateRestaurant } from '../middleware.js';
import restaurants from '../controllers/restaurants.js'

const router = express.Router();


router.get('/', catchAsync(restaurants.index));
router.get('/new', restaurants.newRestaurant);
router.post('/', validateRestaurant, catchAsync(restaurants.createRestaurant));
router.get('/:id', catchAsync(restaurants.showRestaurant))
router.get('/:id/edit', catchAsync(restaurants.editRestaurant))
router.put('/:id', catchAsync(restaurants.updateRestaurant))
router.delete('/:id', catchAsync(restaurants.destroyRestaurant))


export default router;