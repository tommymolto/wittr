import idb from 'idb';

var dbPromise = idb.open('pospoa', 4, function(upgradeDb) {
  switch(upgradeDb.oldVersion) {
    case 0:
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put("world", "hello");
    case 1:
      upgradeDb.createObjectStore('usuario', { keyPath: 'nome' });
    case 2:
      var usuarioStore = upgradeDb.transaction.objectStore('usuario');
      usuarioStore.createIndex('animal', 'corFavorita');
    case 3:
      usuarioStore = upgradeDb.transaction.objectStore('usuario');
      usuarioStore.createIndex('idade', 'idade');
  }
});

// read "hello" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval');
  var keyValStore = tx.objectStore('keyval');
  return keyValStore.get('hello');
}).then(function(val) {
  console.log('The value of "hello" is:', val);
});

// set "foo" to be "bar" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('Added foo:bar to keyval');
});

dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('cat', 'corFavorita');
  return tx.complete;
}).then(function() {
  console.log('Added corFavorita:cat to keyval');
});

// add usuario to "usuario"
dbPromise.then(function(db) {
  var tx = db.transaction('usuario', 'readwrite');
  var usuarioStore = tx.objectStore('usuario');

  usuarioStore.put({
    nome: 'Sam Munoz',
    idade: 25,
    corFavorita: 'dog'
  });

  usuarioStore.put({
    nome: 'Susan Keller',
    idade: 34,
    corFavorita: 'cat'
  });

  usuarioStore.put({
    nome: 'Lillie Wolfe',
    idade: 28,
    corFavorita: 'dog'
  });

  usuarioStore.put({
    nome: 'Marc Stone',
    idade: 39,
    corFavorita: 'cat'
  });

  return tx.complete;
}).then(function() {
  console.log('usuario added');
});

// list all cat usuario
dbPromise.then(function(db) {
  var tx = db.transaction('usuario');
  var usuarioStore = tx.objectStore('usuario');
  var animalIndex = usuarioStore.index('animal');

  return animalIndex.getAll('cat');
}).then(function(usuario) {
  console.log('Cat usuario:', usuario);
});

// usuario by age
dbPromise.then(function(db) {
  var tx = db.transaction('usuario');
  var usuarioStore = tx.objectStore('usuario');
  var ageIndex = usuarioStore.index('idade');

  return ageIndex.getAll();
}).then(function(usuario) {
  console.log('usuario by idade:', usuario);
});

// Using cursors
dbPromise.then(function(db) {
  var tx = db.transaction('usuario');
  var usuarioStore = tx.objectStore('usuario');
  var ageIndex = usuarioStore.index('idade');

  return ageIndex.openCursor();
}).then(function(cursor) {
  if (!cursor) return;
  return cursor.advance(2);
}).then(function logPerson(cursor) {
  if (!cursor) return;
  console.log("Cursored at:", cursor.value.nome);
  // I could also do things like:
  // cursor.update(newValue) to change the value, or
  // cursor.delete() to delete this entry
  return cursor.continue().then(logPerson);
}).then(function() {
  console.log('Done cursoring');
});