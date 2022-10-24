import mongoose from 'mongoose';

const tickerSchema = mongoose.Schema({
    ticker:
    {
        type: String,
        trim: true,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    entries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Entry',
        }
    ],
    stockEntries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'StockEntry'
        }
    ],
}, {
    timestamps: true
}
);


/** Mount the model and export it **/

const Ticker = mongoose.model('Ticker', tickerSchema);
export default Ticker;