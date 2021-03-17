const Flix = require('../models/flix');

module.exports = {
    create
};

function create(req, res) {
    Flix.findById(req.params.id, function (err, flix) {
        flix.reviews.push(req.body);
        flix.save(function (err) {
            res.redirect(`/flix/${flix._id}`);
        });
    });
}