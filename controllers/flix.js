const Flix = require('../models/flix');

module.exports = {
    index,
    newFlix,
    create
    // flixDetail,
    // delete: deleteFlix,
    // compileFlix
}

function index(req, res) {
    Flix.find({}, function (err, flix) {
        res.render('flix/index', { title: 'My Flix', flix })

    });
};

function newFlix(req, res) {

    res.render('flix/new')
}

// function deleteFlix(req, res) {
//     Showcase.findByIdAndDelete(req.params.id, function () {
//         res.redirect('/flix');

//     });

// }


function create(req, res) {

    const flix = new Flix(req.body);
    flix.save(function (err) {
        if (err) {
            return res.render("users/new");
        }
        else {
            console.log('this is a place')
            res.redirect("/flix");
        }

    })
}

// function flixDetail(req, res) {
//     Flix.findById(req.params.id, function (err, flix) {
//         console.log(req.params.id);
//         console.log(flix);
//         res.render('flix/detail', { flix: flix })
//     });
// };

// function compileFlix(req, res) {
//     Flix.red
// }