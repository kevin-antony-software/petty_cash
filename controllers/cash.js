const Cash = require('../models/cash');

module.exports.index = async (req, res) => {
    const cash = await Cash.find({});
    res.render('cash/index', { cash })
}

module.exports.renderNewForm = (req, res) => {
    res.render('cash/new');
}

module.exports.createCash = async (req, res, next) => {
    const cash = new Cash(req.body.cash);
    cash.author = req.user._id;
    await cash.save();
    req.flash('success', 'Successfully made a new Transaction!');
    res.redirect(`/cash`)
}

module.exports.showCash = async (req, res,) => {
    const cash = await Cash.findById(req.params.id).populate('author');
    if (!cash) {
        req.flash('error', 'Cannot find that cash!');
        return res.redirect('/cash');
    }
    res.render('cash/show', { cash });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const cash = await Cash.findById(id)
    if (!cash) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/cash');
    }
    res.render('cash/edit', { cash });
}

module.exports.updateCash = async (req, res) => {
    const { id } = req.params;
    const cash = await Cash.findByIdAndUpdate(id, { ...req.body.cash });
    req.flash('success', 'Successfully updated cash!');
    res.redirect(`/cash/${cash._id}`)
}

module.exports.deleteCash = async (req, res) => {
    const { id } = req.params;
    await Cash.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted cash')
    res.redirect('/cash');
}