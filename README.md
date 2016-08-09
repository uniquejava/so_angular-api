This is a simple nodejs backend for project https://github.com/uniquejava/so_angular
so_angular对应的nodejs后台程序.

### How to run
`mongod` and then `node app` and then `http://localhost:8080`

### Live template有没有
我的目标是, 所有的样板代码都能通过live template生成.
expapp生成app.js

```js
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

```

mgschema生成car.js
```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var $Entity$Schema = new Schema({
  id: Number,
  plate: String,
  color: String,
  entrance: { type: Date, default: Date.now }

});

module.exports = mongoose.model('$Entity$', $Entity$Schema);
```


expcors生成cors.js
```js
module.exports = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' CyperCore');
    if (req.method == "OPTIONS") res.sendStatus(200);
    else  next();
};

```