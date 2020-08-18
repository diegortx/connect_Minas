const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

server.use(express.json());


const OsRoutes = require('./routes/OsRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/Auth');


server.use('/os', OsRoutes);
server.use('/user', UserRoutes);
server.use('/auth', AuthRoutes);


server.listen(3333,()=>{
    console.log('API ONLINE')
})
