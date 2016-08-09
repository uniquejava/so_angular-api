var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-api');

var Car = require('./app/models/car');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
router.use(require('./app/utils/cors'));

router.use(function (req, res, next) {
    console.log('something is happening');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'horray! welcome to our api!'});
});


router.route('/cars')
    .post(function (req, res) {
        console.log(req.body);
        var car = req.body;
        Car.create(car, function (err) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Car created!'});
        });
    }).get(function (req, res) {
    Car.find(function (err, cars) {
        if (err) {
            res.send(err);
        }

        res.json(cars);
    });
});

router.route('/cars/:car_id')
    .get(function (req, res) {
        Car.findOne({id: req.params.car_id}, function (err, car) {
            if (err) {
                res.send(err);
            }

            res.json(car);
        });

    })
    .put(function (req, res) {
        Car.findOne({id: req.params.car_id}, function (err, car) {
            if (err) {
                res.send(err);
            }

            car.color = req.body.color;

            car.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'Car updated!'});
            });
        });
    })
    .delete(function (req, res) {
        Car.findOneAndRemove({id: req.params.car_id}, function (err, car) {
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
