var express =  require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

function initSeguridad (db) {
var userModel = require('./DonacionModel')(db);


router.get('/one/:id',(req, res)=>{
    var id =  req.params.id ;
    userModel.getById(id, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getBYId
});

router.get('/all',(req, res)=>{
    userModel.getAll((err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getAll
});
/*
router.put('/platillos/stock/:id' , (req, res)=>{
    var { stock : _stockDelta } = req.body;
    var stockDelta = 0;
    if (_stockDelta && !isNaN(_stockDelta)){
      stockDelta = parseInt(_stockDelta);
    }
    prdModel.addStockToProduct( req.params.id, stockDelta, (err, rslt)=>{
      if(err){
        return res.status(500).json({});
      }
      return res.status(200).json(rslt);
    })
});

// http://localhost:3000/api/platillos/:id
router.get('/platillos/empresa/:id',(req, res)=>{
    var empresa =  req.params.id ;
    userModel.getAllEmpresa(empresa, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getBYId
});

router.get('/platillos/categoria/:id',(req, res)=>{
    var categoria =  req.params.id ;
    userModel.getAllCategoria(categoria, (err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getBYId
});

router.get('/platillos/categoria/all',(req, res)=>{
    userModel.getAllTipos((err, doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"error"});
      }
      return res.status(200).json(doc);
    });// getBYId
});*/

// http://localhost:3000/api/platillos/new
router.post('/new', (req, res)=>{
  var datosEnviados = req.body;
  // var newUser = userModel.addNew(datosEnviados);
  // return res.status(200).json(newUser);
  userModel.addNew(datosEnviados, (err, addedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({error:'error'});
    }
    return res.status(200).json(addedDoc);
    }); //addNew
}); // post users/new

router.put('/upd/:id', (req, res)=>{
  var id = req.params.id;
  var data = {
    "_id": id,
    ...req.body
  };

  //var updUser = userModel.update( id, req.body);
  userModel.update(data, (err, updatedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(updatedDoc);
  });// update
});

router.put('/desc/:id', (req, res)=>{
  var id = req.params.id;
  var data = {
    "_id": id,
    ...req.body
  };

  //var updUser = userModel.update( id, req.body);
  userModel.updateDesc(data, (err, updatedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(updatedDoc);
  });// update
});


router.delete('/del/:id', (req, res)=>{
  var id = req.params.id;
  userModel.deleteByCode(id, (err, deletedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(deletedDoc);
  }); //  deleteByCode
});//delete

//Nueva funcion (page dentro de front)
router.get('/facet/:page/:items', (req, res)=>{
    var {page, items} = req.params;
    userModel.getProductByFilter(
      parseInt(page),
      parseInt(items),
      "id",
      (err, rslt)=>{
        if(err){
          return res.status(500).json({});
        }
        return res.status(200).json(rslt);
      });
}); // get products page items

 return router;
}

//module.exports = router;
module.exports = initSeguridad;
