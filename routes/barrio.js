"use strict";
var express = require('express');
var barrio = require('../schemas/barrio');
var router = express.Router();
/**
 * @swagger
 * definition:
 *   barrio:
 *     properties:
 *      id:
 *          type: string
 *      nombre:
 *          type: string
 *      localidad:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *              nombre:
 *                  type: string
 *
 */
/**
 * @swagger
 * /barrio:
 *   get:
 *     tags:
 *       - Barrio
 *     description: Retorna un arreglo de objetos barrio
 *     summary: Listar barrios
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: nombre
 *         in: query
 *         description: El nombre o descripción del barrio
 *         required: false
 *         type: string
 *       - name: localidad
 *         in: query
 *         description: _Id de la localidad
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: un arreglo de objetos barrio
 *         schema:
 *           $ref: '#/definitions/barrio'
 * /localidad/{id}:
 *   get:
 *     tags:
 *       - Barrio
 *     description: Retorna un objeto barrio
 *     summary: buscar barrio por ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: _Id del barrio
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: un objeto barrio
 *         schema:
 *           $ref: '#/definitions/barrio'
 */
router.get('/barrio/:id*?', function (req, res, next) {
    if (req.params.id) {
        barrio.findById(req.params.id, function (err, data) {
            if (err) {
                next(err);
            }
            ;
            res.json(data);
        });
    }
    else {
        var query;
        query = barrio.find({});
        if (req.query.nombre) {
            query.where('nombre').equals(RegExp('^.*' + req.query.nombre + '.*$', "i"));
        }
        if (req.query.localidad) {
            query.where('localidad.id').equals(req.query.localidad);
        }
        query.exec(function (err, data) {
            if (err)
                return next(err);
            res.json(data);
        });
    }
});
module.exports = router;
//# sourceMappingURL=barrio.js.map