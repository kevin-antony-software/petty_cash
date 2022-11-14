const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({

    seq: {
        type: Number, 
        default: 0,
    },
    accountBalance: {
        type: Number, 
        default: 0,
    },
    
});

CounterSchema.post('findOneAndDelete', async function (doc) {

})

module.exports = mongoose.model('Counter', CounterSchema);