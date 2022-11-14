const mongoose = require('mongoose');
const cashItems = require('./cash');
const Cash = require('../models/cash');
const Counter = require('../models/counter');


mongoose.connect('mongodb://localhost:27017/petty-cash', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Cash.deleteMany({});
    await Counter.deleteMany({});
    var total = 0;
    for (let i = 1; i < 6; i++) {
        
        const random1000 = Math.floor(Math.random() * 1000);
        const amount = Math.floor(Math.random() * 20) + 10;
        total = total + amount;
        const cashItem = new Cash({
            to: 'test',
            date: Date.now(),
            amount: amount,
            inOut: `in`,
            description: 'testing',
            balance: total,
            author: "test Kevin",
            TransactionID: i,
            
        })
        await cashItem.save();
    }
    const counter = new Counter({
        seq: 5,
        accountBalance: total,
    });
    await counter.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})