const User = require('../models/user');

module.exports = {
    index

};

// function addFlix(req, res) {
//     console.log(req.user, ' req.user');
//     Flix.findById(req.params.id, function(err, flix) {
//         if (flix.users.id(req.user._id)) return res.redirect('/flix');
//     })
//     // req.user is the mongoose document of our logged in user
//     req.user.flix.push(req.body);
//     // if mutate a document we have to save it
//     req.user.save(function (err) {
//         res.redirect('/flix')
//     })
// }

function index(req, res, next) {
    console.log(req.query)
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery)
        .sort(sortKey).exec(function (err, users) {
            if (err) return next(err);
            // Passing search values, name & sortKey, for use in the EJS
            res.render('users/index', {
                users,
                user: req.user,
                name: req.query.name,
                sortKey
            });
        });
}