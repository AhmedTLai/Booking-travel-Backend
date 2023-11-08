const jwt = require('jsonwebtoken')


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.Auth_Token

    if(!token){
        res.status(401).json('You are not authorize')
    }
    jwt.verify(token,'Auth_Token',(err,user)=>{
        if(err) {return res.status(401).json('Token is invalid')}
        req.user = user
        next()
    })
}


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next ,()=>{
        if(req,user.id == req.params.id && req.user.admin){
            next()
        }
        else{
            res.status(401).json('You are not athenticated')
        }
    })
}


export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next ,()=>{
        if(req.user.admin){
            next()
        }
        else{
            res.status(401).json('You are not authorize')
        }
    })
}


