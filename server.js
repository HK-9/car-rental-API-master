const express = require('express')
const app = express()
require('dotenv').config({path:'./.env'})
const cors = require('cors')
const port = process.env.PORT || 5000;
const cookieParser   =  require('cookie-parser');
const dbconnection = require('./db')
const usersRoute = require('./routes/usersRoute');
const authRoute = require('./routes/authRoute');
const varifyJWT = require('./middleware/varifyJWT');
// require('dotenv').config();

app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/cars',varifyJWT,usersRoute);
app.use('/api/bookings',varifyJWT,usersRoute);
///add api version;
app.listen(port,() => console.log(`Node js server started in ${port}`));