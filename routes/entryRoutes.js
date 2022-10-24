import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import {
    addEntry,
    getEntry,
    editEntry,
    removeEntry,
} from '../controllers/entryController.js';

const entryRouter = express.Router();

entryRouter.route('/')
    .post(checkAuth, addEntry);

entryRouter
    .route('/:id')
    .get(checkAuth, getEntry)
    .put(checkAuth, editEntry)
    .delete(checkAuth, removeEntry);

export default entryRouter;