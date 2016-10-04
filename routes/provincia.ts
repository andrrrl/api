import * as express from 'express'
import * as provincia from '../schemas/provincia'

var router = express.Router();

router.get('/provincia/:id*?', function(req, res, next) {

   if (req.params.id) {
       provincia.findById(req.params.id, function (err, data) {
       if (err) {
           next(err);
       };

       res.json(data);
   });
   }
   else{
       var query;
        query = provincia.find({});
        if (req.query.nombre){
            query.where('nombre').equals(RegExp('^.*' + req.query.nombre + '.*$', "i"));
        }
        if (req.query.pais){
            query.where('pais.id').equals(req.query.pais);
        }
        query.exec((err, data)=> {
           if (err) return next(err);
           res.json(data);
        });
   }
});

export = router;