'use strict';

const Hapi = require('hapi');
const MongoDB = require('hapi-mongodb');
const DBConfig = require('./src/Data/DBConfig');
var routes = require('./src/routes/route');
let server = new Hapi.Server();
server.connection({
    port: 3333
});

server.route(routes);

server.register({
    register: MongoDB,
    options: DBConfig.opts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
    server.start(console.log('Server started at:', server.info.uri));
});