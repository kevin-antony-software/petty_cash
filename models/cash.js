const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CashSchema = new Schema({
    to: String,
    date: Date,
    amount: Number,

    inOut: {
        type: String,
        enum : ["in", "out"],
        default: 'out',
    },
    description: String,
    balance: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

CashSchema.post('findOneAndDelete', async function (doc) {

})

module.exports = mongoose.model('Cash', CashSchema);