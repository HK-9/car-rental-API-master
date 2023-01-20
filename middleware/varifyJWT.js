const jwt = require('jsonwebtoken');

const varifyJWT = (req,res,next)=>{
    try {
        
        const cookie = req.headers.cookie;
        if(!cookie) return res.status(401).joson({message:'no cookie found in header'});
        const xjwtToken = cookie.split("=")[1];
        if(!xjwtToken) return res.status(402).json({message:'unauthorized, jwt missing'});
        const jwtToken = xjwtToken.split(";")[0];
        jwt.verify(jwtToken,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({message:'Forbiden-manupulated token'});
            }
            req.userId = decoded.id;
            console.log("decoded",req.userId)
            next();
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({status:'jwt middleware failed',message:error})
    }
}

module.exports = varifyJWT;