const jwt = require('jsonwebtoken');

const varifyJWT = (req,res,next)=>{
    try {
        
        const cookie = req.headers.cookie;
        if(!cookie) return res.status(403).json({messsage:'cookie missing'});
        const xjwtToken = cookie.split("=")[1];
        if(!xjwtToken) return res.status(402).json({message:'unauthorized'});
        const jwtToken = xjwtToken.split(";")[0];
        jwt.verify(jwtToken,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({message:'Forbiden-manupulated token'});
            }
            req.user = decoded
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error"})
    }
}

module.exports = varifyJWT;