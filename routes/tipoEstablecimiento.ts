import * as express from 'express'
import * as tipoEstablecimiento from '../schemas/tipoEstablecimiento'

var router = express.Router();

router.get('/tipoEstablecimiento', function (req, res, next) {
    tipoEstablecimiento.find({},{nombre:1}, (err, data) => {
        if (err) {
            next(err);
        };
        res.json(data);
    });
});

export = router;







