/********************************FALTA GETENTRIES********************************************** */

import Entry from '../models/Entry.js'
import Ticker from '../models/Ticker.js'

const addEntry = async (req, res) => {
    const { ticker } = req.body;

    const existEntry = await Ticker.findById(ticker);


    if (!existEntry) {
        const error = new Error('Ticker doesn`t exist');
        return res.status(404).json({ msg: error.message });
    }

    if (existEntry.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const entryStored = await Entry.create(req.body)
        /************************************ Store Entry id on the Ticker **************************************/
        existEntry.entries.push(entryStored._id);
        await existEntry.save();
        /**************************************************************************************************/
        res.json(entryStored)
    } catch (error) {
        console.log(error)
    }
};

const getEntry = async (req, res) => {
    const { id } = req.params;

    const existEntry = await Entry.findById(id).populate('ticker');

    if (!existEntry) {
        const error = new Error('The entry doesn`t exist');
        return res.status(404).json({ msg: error.message });
    }

    if (existEntry.ticker.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(403).json({ msg: error.message });
    }

    res.json(existEntry);
};


const editEntry = async (req, res) => {
    const { id } = req.params;

    const existEntry = await Entry.findById(id).populate('ticker');

    if (!existEntry) {
        const error = new Error('The entry doesn`t exist');
        return res.status(404).json({ msg: error.message });
    };

    if (existEntry.ticker.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(403).json({ msg: error.message });
    };

    existEntry.opened = req.body.opened || existEntry.opened;
    existEntry.callOrPut = req.body.callOrPut || existEntry.callOrPut;
    existEntry.buyOrSell = req.body.buyOrSell || existEntry.buyOrSell;
    existEntry.expiration = req.body.expiration || existEntry.expiration;
    existEntry.strike = req.body.strike || existEntry.strike;
    existEntry.qty = req.body.qty || existEntry.qty;
    existEntry.price = req.body.price || existEntry.price;
    existEntry.howIsEnded = req.body.howIsEnded || existEntry.howIsEnded;
    existEntry.closingDate = req.body.closingDate || existEntry.closingDate;
    existEntry.closingCost = req.body.closingCost || existEntry.closingCost;

    try {
        const entrySaved = await existEntry.save();
        res.json(entrySaved);
    } catch (error) {
        console.log(error)
    }
};

const removeEntry = async (req, res) => {
    const { id } = req.params;

    const existEntry = await Entry.findById(id).populate('ticker');

    if (!existEntry) {
        const error = new Error('The entry doesn`t exist');
        return res.status(404).json({ msg: error.message });
    }

    if (existEntry.ticker.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(403).json({ msg: error.message });
    }

    try {
        await existEntry.deleteOne();
        res.json({ msg: 'Entry deleted' })
    } catch (error) {
        console.log(error)
    }
};

export {
    addEntry,
    getEntry,
    editEntry,
    removeEntry,
}