import idb from 'idb';

var dbPromise = idb.open('pospoa', 1, function(upgradeDb) {
  var keyValStore = upgradeDb.createObjectStore('chavevalor');
  keyValStore.put("world", "hello");
});

// ler "hello" em  "chavevalor"
dbPromise.then(function(db) {
  var tx = db.transaction('chavevalor');
  var keyValStore = tx.objectStore('chavevalor');
  return keyValStore.get('hello');
}).then(function(val) {
  console.log('valor de "hello" :', val);
});

// adicionar "foo" com valor "bar" em "chavevalor"
dbPromise.then(function(db) {
  var tx = db.transaction('chavevalor', 'readwrite');
  var keyValStore = tx.objectStore('chavevalor');
  keyValStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('AdAdicionadoded foo:bar em chavevalor');
});

dbPromise.then(function(db) {
  // TODO: na store chavevalor
  // adicione corFavorita
  // e uma cor
});