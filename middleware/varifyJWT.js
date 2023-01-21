const jwt = require('jsonwebtoken');

const varifyJWT = (req,res,next)=>{
    try {
        const jwtToken = req.headers.authorization?.split(" ")[1];
        if(!jwtToken) return res.status(403).json({messsage:'cookie missing'});
        jwt.verify(jwtToken,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({message:'Forbiden-manupulated token'});
            }
            const userId = decoded.id
            req.user = decoded
            next();
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error"})
    }
}

module.exports = varifyJWT;