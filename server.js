const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config({path:'./.env'})
const cors = require('cors')
const port = process.env.PORT || 5000;
const cookieParser   =  require('cookie-parser');
const dbconnection = require('./db')
const usersRoute = require('./routes/usersRoute');
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const varifyJWT = require('./middleware/varifyJWT');
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/allowedCredentials');
require('dotenv').config();

//SETUP;
app.use(credentials);
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.set("trust proxy", 1);
//ROUTES
app.use('/api/auth', authRoute);
app.use('/api/cars',varifyJWT,usersRoute);
app.use('/api/bookings',varifyJWT,usersRoute);
app.use('/api/admin',varifyJWT,adminRoute)
app.use('/',(req,res)=>res.send(':) server is up and running..'));


// const path = require('path');
// const { rmSync } = require('fs');

// if(process.env.NODE_ENV === 'production'){
//     app.use('/', express.static('client/build'))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(_dirname, 'client/build/index.html'))
//     })
// }

app.listen(port,() => console.log(`Node js server started in ${port}`));