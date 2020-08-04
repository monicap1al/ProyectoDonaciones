var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
var hasIndexEmail = false;

function pswdGenerator( pswdRaw ){
  var hashedPswd = bcrypt.hashSync(pswdRaw, 10);
  return hashedPswd;
}


module.exports = (db)=>{
  var seguridadModel = {}
  var seguridadCollection = db.collection("Donaciones");

  var foodTemplate = {
    id:"",
    NombreCompleto: "",
    Telefono: "",
    Direccion: "",
    Donacion: "",
    userDateCreated: null
  }

  seguridadModel.getAll = (handler)=>{
    var projection = {"id":1,"NombreCompleto": 1, "Telefono": 1, "Direccion":1, "Donacion":1};
    seguridadCollection.find({projection:projection}).toArray(handler);
  }

  /*
  seguridadModel.getAllEmpresa = (empresa, handler)=>{
    // handler(err, docs)
    var projection = { "DescCorta": 1, "DescLong": 1, "Precio":1, "Categoria":1};
    seguridadCollection.find({Empresa:empresa},{projection:projection}).toArray(handler);
  }

  seguridadModel.getAllCategoria = (categoria, handler)=>{
    // handler(err, docs)
    var projection = { "DescCorta": 1, "DescLong": 1, "Precio":1, "Empresa":1};
    seguridadCollection.find({Categoria:categoria},{projection:projection}).toArray(handler);
  }

  seguridadModel.getAllTipos = (handler)=>{
    // handler(err, docs)
    seguridadCollection.distinct("Categoria").toArray(handler);
  }*/

  seguridadModel.addNew = (dataToAdd, handler)=>{
    var {id, NombreCompleto, Telefono, Direccion, Donacion} = dataToAdd;
    var userToAdd = Object.assign(
      {},
      foodTemplate,
      {
        id:id,
        NombreCompleto: NombreCompleto,
        Telefono: Telefono,
        Direccion: Direccion,
        Donacion: Donacion,
        userDateCreated: new Date().getTime()
      }
    );
    seguridadCollection.insertOne(userToAdd, (err, rslt)=>{
      if(err){
        return handler(err, null);
      }
      console.log(rslt);
      return handler(null, rslt.ops[0]);
    }); //insertOner
  }

  seguridadModel.update = ( dataToUpdate , handler )=>{
    var { _id, NombreCompleto, Telefono, Direccion, Donacion} = dataToUpdate;
    var query = { "_id": new ObjectID(_id)};
    var updateCommad = {
      "$set":{
        NombreCompleto: NombreCompleto,
        Telefono: Telefono,
        Direccion: Direccion,
        Donacion: Donacion,
        lastUpdated: new Date().getTime()
      },
      "$inc" :{
        "updates": 1
      }
    };
    seguridadCollection.updateOne(
      query,
      updateCommad,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );// updateOne
  }


  seguridadModel.updateDesc = ( dataToUpdate , handler )=>{
    var { _id, estado} = dataToUpdate;
    var query = { "_id": new ObjectID(_id)};
    var updateCommad = {
      "$set":{
        Estado:estado,
        lastUpdated: new Date().getTime()
      },
      "$inc" :{
        "updates": 1
      }
    };
    seguridadCollection.updateOne(
      query,
      updateCommad,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    );// updateOne
  }


  seguridadModel.deleteByCode = (id, handler)=>{
    var query = {"_id": new ObjectID(id)};
    seguridadCollection.deleteOne(
      query,
      (err, rslt)=>{
        if(err){
          return handler(err, null);
        }
        return handler(null, rslt.result);
      }
    ); //deleteOne
  }

  seguridadModel.getById = (id, handler) => {
    var query = {"_id": new ObjectID(id) };
    seguridadCollection.findOne(
      query,
      (err, doc) => {
        if (err) {
          return handler(err, null);
        }
        return handler(null, doc);
      }
    ); //findOne
  }


  seguridadModel.comparePswd = (hash, raw)=>{
    return bcrypt.compareSync(raw, hash);
  }

  /*
  seguridadModel.getByEmpresa = (empresa, handler)=>{
    var query = {"Empresa":empresa};
    var projection = { "DescCorta": 1, "DescLong": 1, "Precio":1, "Categoria":1};
    seguridadCollection.findOne(
      query,
      {"projection":projection},
      (err, user)=>{
        if(err){
          return handler(err,null);
        }
        return handler(null, user);
      }
    )
  }*/

  
  seguridadModel.getProductByFilter = async (_page, _itemsPerPage, _sortBy, handler) => {
    var page = _page || 1;
    var itemsPerPage = _itemsPerPage || 10;
    var sortBy = _sortBy || "id";
    var options = { "id": 1, "NombreCompleto": 1, "Telefono": 1, "Direccion": 1, "Donacion": 1};
    let cursor = seguridadCollection.find().limit(itemsPerPage);
    let totalProds = await cursor.count();
    cursor.toArray((err, docs) => {
      if (err) {
        console.log(err);
        return handler(err, null);
      }
        console.log(docs);
        return handler(null, { total: totalProds, products: docs });

    });
  };
/*
  seguridadModel.addStockToProduct = (id, stockAmount, handler) => {
    var filter = {"_id": new ObjectID(id)};
    var updateCmd = {"$inc": {"stock": stockAmount}};
    prdColl.findOneAndUpdate(filter, updateCmd, { returnOriginal: false }, (err, rslt)=>{
        if(err){
          console.log(err);
          return handler(err, null);
        } else {
          return handler(null, rslt.value);
        }
    })
  }; //addStockToProduct*/

  return seguridadModel;
}
