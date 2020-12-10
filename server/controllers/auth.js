const User  = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signUp = (req,res)=>{

    
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
                error:'Email is taken'
            })
        }
        const {name,email,password} = req.body;
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name,email,password,profile,username})
        newUser.save((err,success)=>{
            console.log(err)
            if(err){
                return res.status(400).json({
                    error:err.map(data=>data.msg)
                })
            }
            res.json({
                message:'Signup Successful! Please Signin'
            })
        })
    })
} 

exports.signIn = (req,res)=>{
    const {email,password} = req.body

    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'users with email address is not found! Please Signup'
            })
        }
        if(!user.authenticate(password)){
            return res.status(400).json({
                error:'Email and Password does not match'
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.cookie('token',token,{expiresIn:'1d'})
        const {_id,username,name,email,role} = user;
        return res.json({
            token,
            user:{_id,username,name,email,role}
        })
    })
}

exports.signOut = (req,res)=>{
    res.clearCookie('token')


    res.json({
        message:'Signout Successful!'
    })
}

exports.requireSignin = expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
});


exports.authMiddleware = (req,res,next)=>{
    const authUserId= req.user._id;

    User.findById({_id:authUserId}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'user not found'
            })
        }
        req.profile = user
        next()
    })
}

exports.adminMiddleware = (req,res,next)=>{
    const adminUserId= req.user._id;

    User.findById({_id:adminUserId}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'user not found'
            })
        }
        if(user.role !== 1 ){
            return res.status(400).json({
                error:'Access Denied.You have to be a admin to acess this Page!'
            })
        }
        req.profile = user
        next()
    })
}

exports.read  = (req,res)=>{
    req.profile.hashed_password = undefined
    return res.json(req.profile)
}