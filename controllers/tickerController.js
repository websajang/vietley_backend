import Ticker from '../models/Ticker.js'
import Entry from '../models/Entry.js'

/** All this actions need authentication **/

/*********************************************** Fetch all the tickers the user has created *******************************************************/

const getTickers = async (req, res) => {
    const collection = await Ticker.find().where("creator").equals(req.user._id).select('-entries -stockEntries');

    res.json(collection);
};

/**************************************************************************************************************************************************/

/*********************************************** Create a new Ticker ******************************************************************************/
const newTicker = async (req, res) => {
    const ticker = new Ticker(req.body);
    ticker.creator = req.user._id;

    try {
        const tickerStored = await ticker.save();
        res.json(tickerStored);
    } catch (error) {
        console.log(error)
    }
};

/*************************************************************************************************************************************************/

/*********************************************** Get only one ticker that the user created before *************************************************/

const getTicker = async (req, res) => {
    /** deconstruct @id give the part of the url where the id of the project is given **/
    const { id } = req.params;

    /** Populate with entries only when we get the ticker in singular, when we get tickers we dont need that information **/
    const getOne = await Ticker.findById(id).populate('entries').populate('stockEntries');

    /** Check if there is some ticker that the user created before **/
    if (!getOne) {
        const error = new Error('Not found')
        return res.status(404).json({ msg: error.message });
    }
    /** This part is tricky because getOne.creator === req.user._id or getOne.creator == req.user._id returns false in JS. So we need to string to compare.  **/
    if (getOne.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Access denied')
        return res.status(401).json({ msg: error.message });

    };

    /** Get all entries of the ticker **/
    res.json(
        getOne
    );

};

/*************************************************************************************************************************************************/

/*********************************************** Edit ticker by the user *************************************************************************/
/** This will have the same verifications as @getTicker so the code is copied **/
const editTicker = async (req, res) => {
    const { id } = req.params;
    const editOne = await Ticker.findById(id);

    if (!editOne) {
        const error = new Error('Not found')
        return res.status(404).json({ msg: error.message });
    }

    if (editOne.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Access denied')
        return res.status(404).json({ msg: error.message });

    };

    /** If the user requests via req.body some new input it will be placed in the database, if not it will keep the one that is in the database already **/
    editOne.ticker = req.body.ticker || editOne.ticker;

    try {
        const editOneStored = await editOne.save();
        res.json(editOne);
    } catch (error) {
        console.log(error)
    }
};

/*************************************************************************************************************************************************/

/*********************************************** Remove ticker by the user ***********************************************************************/
const removeTicker = async (req, res) => {
    /** This will have the same verifications as @getTicker so the code is copied **/
    const { id } = req.params;
    const removeOne = await Ticker.findById(id);

    if (!removeOne) {
        const error = new Error('Not found')
        return res.status(404).json({ msg: error.message });
    }

    if (removeOne.creator.toString() !== req.user._id.toString()) {
        const error = new Error('Access denied')
        return res.status(404).json({ msg: error.message });

    };

    try {
        await removeOne.deleteOne();
        res.json({ msg: "Ticker deleted" })
    } catch (error) {
        console.log(error)
    }
};

export {
    getTickers,
    newTicker,
    getTicker,
    editTicker,
    removeTicker,
};