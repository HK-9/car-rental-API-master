const jwt = require('jsonwebtoken');

const varifyJWT = (req,res,next)=>{
    const cookie = req.headers.cookie;
    if(!cookie) return next();
    const jwtToken = cookie.split("=")[1];
    if(!jwtToken) return res.status(401).json({message:'unauthorized'});
    jwt.verify(jwtToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:'Forbiden-manupulated token'});
        }
        req.body.decoded = decoded
        next();
    })
}

module.exports = varifyJWT;