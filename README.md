# Wittr

Uma demo boba de offline first

# Instalando

Dependencias:

* [Node.js](https://nodejs.org/en/) v0.12.7 ou acima

De um checkout e rode:

```sh
npm install
```

# Rodando

```sh
npm run serve
```

Você deve ter o projeto do aplicativo rodando em [localhost:8888](http://localhost:8888) e o servidor de configuração em t [localhost:8889](http://localhost:8888).

Se quiser, configure as portas com :

```sh
npm run serve -- --server-port=8000 --config-server-port=8001
```

# FAQ

- Errors while executing `npm run serve`
  - The first thing to try is to upgrade to latest version of node
  - If latest version also produces errors, try installing v4.5.0
    - An easy for that would be to use `nvm` as discussed [here](http://stackoverflow.com/a/7718438/1585523)
