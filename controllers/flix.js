const Flix = require('../models/flix');

module.exports = {
    index,
    newFlix,
    delete: deleteFlix,
    create,
    show,
    randomFlix

}


function randomFlix(req, res) {
    Flix.find({ 'user': req.user._id }, function (err, flix) {
        let rando = flix[Math.floor(Math.random() * flix.length)];
        console.log("This is rando" + rando)
        res.render('flix/show', { flix: rando })
    });
}

function show(req, res) {
    Flix.findById(req.params.id, function (err, flix) {
        // console.log(req.params.id);
        // console.log(flix)
        res.render('flix/show', { title: "Flix Detail", flix })
    });
};


function index(req, res) {
    Flix.find({ 'user': req.user._id }, function (err, flix) {
        // console.log(flix)
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
    // console.log("in create")
    req.body.user = req.user._id;
    const flix = new Flix(req.body);
    flix.save(function (err) {
        // console.log("This is err: " + err)
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



