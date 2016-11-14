"use strict";
var express = require('express');
var espacioFisico = require('../../../schemas/turnos/espacioFisico');
var router = express.Router();
router.get('/espacioFisico/:id*?', function (req, res, next) {
    if (req.params.id) {
        espacioFisico.findById(req.params.id, function (err, data) {
            if (err) {
                next(err);
            }
            ;
            res.json(data);
        });
    }
    else {
        var query;
        query = espacioFisico.find({}); //Trae todos 
        if (req.query.nombre) {
            query.where('nombre').equals(RegExp('^.*' + req.query.nombre + '.*$', "i"));
        }
        query.exec(function (err, data) {
            if (err)
                return next(err);
            res.json(data);
        });
    }
});
router.post('/espacioFisico', function (req, res, next) {
    var newespacioFisico = new espacioFisico(req.body);
    newespacioFisico.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(newespacioFisico);
    });
});
router.put('/espacioFisico/:id', function (req, res, next) {
    espacioFisico.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, data) {
        if (err) {
            return next(err);
        }
        res.json(data);
    });
});
router.delete('/espacioFisico/:_id', function (req, res, next) {
    espacioFisico.findByIdAndRemove(req.params._id, function (err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});
module.exports = router;
//# sourceMappingURL=espacioFisico.js.map