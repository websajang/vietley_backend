import mongoose from 'mongoose'

const StockEntrySchema = mongoose.Schema({
    date: {
        type: Date,
    },
    assignedOrCalled: {
        type: String,
    },
    buyOrSell: {
        type: String,
    },
    shares: {
        type: Number,
    },
    cost: {
        type: Number,
    },
    ticker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticker'
    },
}, {
    timestamps: true
});

const StockEntry = mongoose.model('StockEntry', StockEntrySchema);
export default StockEntry;