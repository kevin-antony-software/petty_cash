const Cash = require('../models/cash');
const Counter = require('../models/counter');


module.exports.index = async (req, res) => {
    const cash = await Cash.find({}).sort({ TransactionID: -1 });
    res.render('cash/index', { cash })
}

module.exports.renderNewForm = (req, res) => {
    res.render('cash/inCash');
}
module.exports.renderNewOutForm = (req, res) => {
    res.render('cash/outCash');
}


module.exports.inCash = async (req, res, next) => {

    const counter = await Counter.findOne();
    const cash = new Cash({
        to: "Petty Account",
        date: Date.now(),
        amount: req.body.InputAmount,
        inOut: "in",
        description: "In cash to Petty",
        author: "Test Kevin",
        balance: counter.accountBalance + parseInt(req.body.InputAmount),
        TransactionID: counter.seq + 1,
    });
    await cash.save();
    await Counter.findOneAndUpdate(
        { $inc: { "seq": 1, "accountBalance": parseInt(req.body.InputAmount), } }
    )
    req.flash('success', 'Successfully made a new Transaction!');
    res.redirect(`/cash`);
}

module.exports.outCash = async (req, res, next) => {
    console.log("testttt")
    const counter = await Counter.findOne();
    if (req.body.expenseAmountInput < counter.accountBalance) {
        const cash = new Cash({
            to: req.body.paidToInput,
            date: Date.now(),
            amount: req.body.expenseAmountInput,
            inOut: "out",
            description: req.body.paidReasonInput,
            author: "Test Kevin",
            balance: counter.accountBalance - parseInt(req.body.expenseAmountInput),
            TransactionID: counter.seq + 1,
        });
        await cash.save();
        await Counter.findOneAndUpdate(
            { $inc: { "seq": 1, "accountBalance": -parseInt(req.body.expenseAmountInput), } }
        )
        //req.flash('success', 'Successfully made a new Transaction!');
        res.redirect(`/cash`);
    } else {
        //req.flash('success', 'Not Enough Funds');
        res.redirect(`/cash`);
    }
    
}
