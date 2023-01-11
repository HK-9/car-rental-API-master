const mongoose = require('mongoose');

function connectDB(){
    console.log(process.env.DATABASE_URL);

    mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology:true,useNewUrlParser:true})

    const connection = mongoose.connection
    
    connection.on('connected',() => {
        console.log('Mongo DB connection successfull');
    })
    connection.on('failed',() => {
        console.log('Mongo DB connection Error');
    })
    
}
connectDB();

module.exports = mongoose;