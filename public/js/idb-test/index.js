import idb from 'idb';

var dbPromise = idb.open('pospoapwa', 5,function(upgradeDb) {
  switch(upgradeDb.oldVersion) {
    case 0:
      var chavevalorStore = upgradeDb.createObjectStore('chavevalor');
      chavevalorStore.put("world", "hello");
    case 1:
      upgradeDb.createObjectStore('usuario', { keyPath: 'nome' });
    case 2:
      var usuarioStore = upgradeDb.transaction.objectStore('usuario');
      usuarioStore.createIndex('cor', 'corFavorita');
  }
  // TODO: criar um indice em 'usuario' chamado 'idade', ordenado por 'idade'
});

// ler "hello" em "chavevalor"
dbPromise.then(function(db) {
  var tx = db.transaction('chavevalor');
  var chavevalorStore = tx.objectStore('chavevalor');
  return chavevalorStore.get('hello');
}).then(function(val) {
  console.log('valor de "hello" :', val);
});

// criar "foo" com valor "bar" em "chavevalor"
dbPromise.then(function(db) {
  var tx = db.transaction('chavevalor', 'readwrite');
  var chavevalorStore = tx.objectStore('chavevalor');
  chavevalorStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('Adicionado foo:bar em chavevalor');
});

dbPromise.then(function(db) {
  var tx = db.transaction('chavevalor', 'readwrite');
  var chavevalorStore = tx.objectStore('chavevalor');
  chavevalorStore.put('azul', 'corFavorita');
  return tx.complete;
}).then(function() {
  console.log('Added corFavorita:cat to chavevalor');
});

// adicionar usuarios em "usuario"
dbPromise.then(function(db) {
  var tx = db.transaction('usuario', 'readwrite');
  var usuarioStore = tx.objectStore('usuario');

  usuarioStore.put({
    nome: 'Sam Munoz',
    age: 25,
    corFavorita: 'vermelho'
  });

  usuarioStore.put({
      nome: 'Susan Keller',
    age: 34,
    corFavorita: 'vermelho'
  });

  usuarioStore.put({
      nome: 'Lillie Wolfe',
    age: 28,
    corFavorita: 'azul'
  });

  usuarioStore.put({
      nome: 'Marc Stone',
    age: 39,
    corFavorita: 'azul'
  });

  return tx.complete;
}).then(function() {
  console.log('usuarios adicionados');
});


dbPromise.then(function(db) {
  var tx = db.transaction('usuario');
  var usuarioStore = tx.objectStore('usuario');
    //cria indice
  var corIndex = usuarioStore.index('cor');
    // lista usuarios com cor azul
  return corIndex.getAll('azul');
}).then(function(usuario) {
  console.log('usuarios com azul:', usuario);
});

// TODO: console.log all usuario ordered by age