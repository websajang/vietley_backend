import express from 'express';
import {
    getTickers,
    newTicker,
    getTicker,
    editTicker,
    removeTicker,
} from '../controllers/tickerController.js';
import checkAuth from '../middleware/checkAuth.js';

const tickerRouter = express.Router()

tickerRouter
    .route('/')
    .get(checkAuth, getTickers)
    .post(checkAuth, newTicker);

tickerRouter
    .route('/:id')
    .get(checkAuth, getTicker)
    .put(checkAuth, editTicker)
    .delete(checkAuth, removeTicker);

export default tickerRouter;