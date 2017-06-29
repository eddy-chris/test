var PouchDB = require('pouchdb');
window.PouchDB = PouchDB;
var localDB = new PouchDB('test_pouch');
var remoteDB = new PouchDB('http://138.197.87.123:5984/test_pouch');

var dbHelpers = {
  localDB: localDB,
  remoteDB: remoteDB,

  getUsers: function () {
    /*localDB.sync(remoteDB, {retry: true, live: true}).on('complete', function (e) {
      console.log('sync success', e)
    }).on('error', function (err) {
      console.log('Failed to sync', err);
    });*/

    return localDB.allDocs({include_docs: true})
      .then(function(response){
        return response.rows;
      })
      .catch(function (err) {
        console.warn('Failed to getUsers', err)
      });
  },

  addUser: function (doc) {
    return localDB.put(doc, function(err, response) {
      if (err) {
        return console.log(err);
      } else {
        /*localDB.sync(remoteDB, {retry: true, live: true}).on('complete', function (e) {
          console.log('sync success', e)
        }).on('error', function (err) {
          console.log('Failed to sync', err);
        });*/
        console.log("Document created Successfully");
      }
    });
  },

  docToJSON: function (doc) {
    return {
      id: doc._id,
      name: doc.name,
      email: doc.email,
      addr: doc.addr,
      phone: doc.phone
    }
  }
  
};

module.exports = dbHelpers;