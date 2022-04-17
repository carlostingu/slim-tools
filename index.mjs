import express from 'express';
import http from 'http';
import {
    Server
} from 'socket.io';

import home from './src/routes/home.mjs';

const app = express();
const server = http.createServer(app);

global.io = new Server(server);
global.wpp = {};

/* Views */
app.set('view engine', 'ejs');
app.set('views', 'theme/views');

/* Assets */
app.use('/assets', express.static('theme/assets'));

/* Form */
app.use(express.json());

app.use('/', home);

server.listen(3000, run);

function run() {
    console.log('App Started In: http://localhost:3000');
}