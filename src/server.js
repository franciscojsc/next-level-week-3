// import dependencies
const express = require('express');
const path = require('path');
const pages = require('./pages');

// init the express
const server = express();

// use the files static
server.use(express.static(path.join(__dirname, '..', 'public')));

// configure template engine
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

// create routes
server.get('/', pages.index);
server.get('/orphanage', pages.orphanage);
server.get('/orphanages', pages.orphanages);
server.get('/create-orphanage', pages.createOrphanage);

// turn on server
server.listen(5500);
