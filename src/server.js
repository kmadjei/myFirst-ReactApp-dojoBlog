const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json'); 
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000; // <== You can change the port

server.use(middlewares);
server.use(router);

server.listen(port);