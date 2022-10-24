import mongoose from 'mongoose'

const entrySchema = mongoose.Schema({
    opened: {
        type: Date,
    },
    callOrPut: {
        type: String,
    },
    buyOrSell: {
        type: String,
    },
    expiration: {
        type: Date,
    },
    strike: {
        type: Number,
    },
    qty: {
        type: Number,
    },
    price: {
        type: Number,
    },
    howIsEnded: {
        type: String,
    },
    closingDate: {
        type: Date,
    },
    closingCost: {
        type: Number,
    },
    ticker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticker'
    }
}, {
    timestamps: true
});

const Entry = mongoose.model('Entry', entrySchema);
export default Entry;