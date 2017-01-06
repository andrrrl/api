import * as express from 'express'
import * as espacioFisico from '../../schemas/turnos/espacioFisico'
import * as agenda from '../../schemas/turnos/agenda'
import * as transactions from '../../schemas/turnos/transactions'

var router = express.Router();
router.get('/espacioFisico/:_id*?', function (req, res, next) {
    if (req.params._id) {
        espacioFisico.findById(req.params._id, function (err, data) {
            if (err) {
                next(err);
            };

            res.json(data);
        });
    } else {
        var query;
        query = espacioFisico.find({}); //Trae todos 
        if (req.query.nombre) {
            query.where('nombre').equals(RegExp('^.*' + req.query.nombre + '.*$', "i"));
        }
        query.exec((err, data) => {
            if (err) return next(err);
            res.json(data);
        });
    }
});

router.post('/espacioFisico', function (req, res, next) {
    var newEspacioFisico = new espacioFisico(req.body)
    newEspacioFisico.save((err) => {
        if (err) {
            return next(err);
        }
        res.json(newEspacioFisico);
        console.log(newEspacioFisico);
    })
});

router.put('/espacioFisico/:id', function (req, res, next) {
    let variable: any;
    // Inicializar Transfer Record
    let newTransaction = new transactions({ referencia: req.body.id, nombre: req.body.nombre, state: "initial", lastModified: new Date() });
    newTransaction.save((err) => {
        if (err) {
            return next(err);
        }
        //1) Recuperar la transacción y 2) Actualizar el estado a Pending
        transactions.findOneAndUpdate({ state: "initial" }, { $set: { state: "pending" }, $currentDate: { lastModified: true } }, function (err, transaction) {
            if (err) {
                return next(err);
            }
            //3) Aplicar la transacción a ambas cuentas
            variable = transaction;
            agenda.findOneAndUpdate(
                { "espacioFisico.id": variable.referencia, pendingTransactions: { $ne: variable._id } },
                { $set: { "espacioFisico.nombre": variable.nombre }, $push: { pendingTransactions: variable._id } },
                function (err, data) {
                    if (err) {
                        return next(err);
                    }
                });

            espacioFisico.findOneAndUpdate(
                { _id: variable.referencia, pendingTransactions: { $ne: variable._id } },
                //aca tendría que agregar todo lo que se puede modificar del espacio físico
                { $set: { nombre: variable.nombre, edificio: req.body.edificio }, $push: { pendingTransactions: transaction._id } },
                function (err, data) {
                    if (err) {
                        return next(err);
                    }
                    //res.json(data);
                    res.json({});
                });
            
            // 4) Actualizar el estado a Applied
            transactions.findOneAndUpdate(
                { _id: transaction._id, state: "pending" },
                { $set: { state: "applied" }, $currentDate: { lastModified: true } }, function (err, transaction) {
                    if (err) {
                        return next(err);
                    }
                });
            
            // 5) Actualizar en ambas cuentas, la lista de pendingTransactions
            espacioFisico.findOneAndUpdate(
                { _id: variable.referencia, pendingTransactions: variable._id },
                { $pull: { pendingTransactions: transaction._id } },
                function (err, data) {
                    if (err) {
                        return next(err);
                    }
                });
            agenda.findOneAndUpdate(
                { "espacioFisico.id": variable.referencia, pendingTransactions: variable._id },
                { $pull: { pendingTransactions: transaction._id } },
                function (err, data) {
                    if (err) {
                        return next(err);
                    }
                });
            
            // 6) Actualizar el estado a Done
            transactions.findOneAndUpdate(
                { _id: transaction._id, state: "applied" },
                { $set: { state: "done" }, $currentDate: { lastModified: true } }, function (err, transaction) {
                    if (err) {
                        return next(err);
                    }
                });
        });
    })
});

router.delete('/espacioFisico/:_id', function (req, res, next) {
    espacioFisico.findByIdAndRemove(req.params._id, function (err, data) {
        if (err)
            return next(err);

        res.json(data);
    });
})

export = router;