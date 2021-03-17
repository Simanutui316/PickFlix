const Flix = require('../models/flix');

module.exports = {
    index,
    newFlix,
    delete: deleteFlix,
    create
    // flixDetail,
    // compileFlix
}

function index(req, res) {
    Flix.find({ 'user': req.user._id }, function (err, flix) {
        res.render('flix/index', { flix: flix })

    });
};

function newFlix(req, res) {


    res.render('flix/new')
}

function deleteFlix(req, res) {
    Flix.findByIdAndDelete(req.params.id, function () {
        res.redirect('/flix');

    });

}


function create(req, res) {


    req.body.user = req.user._id;
    const flix = new Flix(req.body);
    flix.save(function (err) {
        if (err) {
            return res.render("flix/new");
        }
        else {
            console.log('this is a place')
            res.redirect("/flix");
        }

    })
    console.log(flix)
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