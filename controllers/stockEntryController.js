import StockEntry from '../models/StockEntry.js'
import Ticker from '../models/Ticker.js'

const addStockEntry = async (req, res) => {
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
        const stockEntryStored = await StockEntry.create(req.body)
        /** Store ID in Ticker **/
        existEntry.stockEntries.push(stockEntryStored._id);
        await existEntry.save()

        res.json(stockEntryStored)
    } catch (error) {
        console.log(error)
    }
};

const getStockEntry = async (req, res) => {
    const { id } = req.params;

    const existStockEntry = await StockEntry.findById(id).populate('ticker');

    if (!existStockEntry) {
        const error = new Error('The entry doesn`t exist');
        return res.status(404).json({ msg: error.message });
    }

    if (existStockEntry.ticker.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(403).json({ msg: error.message });
    }

    res.json(existStockEntry);
};

const editStockEntry = async (req, res) => {
    const { id } = req.params;

    const existStockEntry = await StockEntry.findById(id).populate('ticker');

    if (!existStockEntry) {
        const error = new Error('The entry doesn`t exist');
        return res.status(404).json({ msg: error.message });
    }

    if (existStockEntry.ticker.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(403).json({ msg: error.message });
    }

    existStockEntry.date = req.body.date || existStockEntry.date;
    existStockEntry.assignedOrCalled = req.body.assignedOrCalled || existStockEntry.assignedOrCalled;
    existStockEntry.buyOrSell = req.body.buyOrSell || existStockEntry.buyOrSell;
    existStockEntry.shares = req.body.shares || existStockEntry.shares;
    existStockEntry.cost = req.body.cost || existStockEntry.cost;

    try {
        const stockEntrySaved = await existStockEntry.save();
        res.json(stockEntrySaved);
    } catch (error) {
        console.log(error)
    }
};

const removeStockEntry = async (req, res) => {
    const { id } = req.params;

    const existStockEntry = await StockEntry.findById(id).populate('ticker');

    if (!existStockEntry) {
        const error = new Error('The entry doesn`t exist');
        return res.status(404).json({ msg: error.message });
    }

    if (existStockEntry.ticker.creator.toString() !== req.user._id.toString()) {
        const error = new Error('You don`t have permissions');
        return res.status(403).json({ msg: error.message });
    }

    try {
        await existStockEntry.deleteOne();
        res.json({ msg: 'Stock Entry deleted' });
    } catch (error) {
        console.log(error)
    }
};

export {
    addStockEntry,
    getStockEntry,
    editStockEntry,
    removeStockEntry,
}