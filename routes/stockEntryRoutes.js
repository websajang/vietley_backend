import express from 'express'
import checkAuth from '../middleware/checkAuth.js';

import {
    addStockEntry,
    getStockEntry,
    editStockEntry,
    removeStockEntry,
} from '../controllers/stockEntryController.js';


const stockEntryRouter = express.Router();

stockEntryRouter.post('/', checkAuth, addStockEntry);
stockEntryRouter
    .route('/:id')
    .get(checkAuth, getStockEntry)
    .put(checkAuth, editStockEntry)
    .delete(checkAuth, removeStockEntry)


export default stockEntryRouter;