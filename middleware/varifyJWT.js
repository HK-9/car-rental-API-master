// const jwt = require('jsonwebtoken');

// const varifyJWT = (req,res,next)=>{
//     try {
//         console.log("object",req.headers.authorization)
//         if(!req.headers.authorization) return res.status(401).json({message:'credentials missing'})
//         const jwtToken = req.headers.authorization?.split(" ")[1];
//         console.log("processing server @ varify middleware",jwtToken);
//         if(!jwtToken) return res.status(401).json({messsage:'cookie missing'});
//         //client lacks valid authentication credentials for the requested resource.
//         jwt.verify(jwtToken,process.env.JWT_SECRET,(err,decoded)=>{
//             if(err){
//                 return res.status(403).json({message:'Forbiden-manupulated token'});
//                 //a client is forbidden from accessing a valid URL
//             }
//             const userId = decoded.id
//             req.user = decoded
//             next();
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({message:"error"})
//     }
// }

// module.exports = varifyJWT;

const jwt = require('jsonwebtoken');

const varifyJWT = (req,res,next)=>{
    const cookie = req.headers.cookie;
    if(!cookie) return res.status(403).json({message:'cookie missing'});
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