var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-api');

var $Entity$ = require('./app/models/$entity$');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || $port$;

var router = express.Router();
router.use(require('./app/utils/cors'));

router.use(function (req, res, next) {
    console.log('something is happening');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'horray! welcome to our api!'});
});


router.route('/$entity$s')
    .post(function (req, res) {
        console.log(req.body);
        var $entity$ = req.body;
        $Entity$.create($entity$, function (err) {
            if (err) {
                res.send(err);
            }

            res.json({message: '$Entity$ created!'});
        });
    }).get(function (req, res) {
    $Entity$.find(function (err, $entity$s) {
        if (err) {
            res.send(err);
        }

        res.json($entity$s);
    });
});

router.route('/$entity$s/:$entity$_id')
    .get(function (req, res) {
        $Entity$.findOne({id: req.params.$entity$_id}, function (err, $entity$) {
            if (err) {
                res.send(err);
            }

            res.json($entity$);
        });

    })
    .put(function (req, res) {
        $Entity$.findOne({id: req.params.$entity$_id}, function (err, $entity$) {
            if (err) {
                res.send(err);
            }

            $entity$.color = req.body.color;

            $entity$.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: '$Entity$ updated!'});
            });
        });
    })
    .delete(function (req, res) {
        $Entity$.findOneAndRemove({id: req.params.$entity$_id}, function (err, $entity$) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'successfully deleted.'});

        });
    });


//app.use('/api', router);
app.use(router);


app.listen(port);
console.log('Magic happens on port ' + port);
