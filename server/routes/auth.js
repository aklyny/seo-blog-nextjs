const express = require('express')

const router = express.Router()

const {signUp,signIn,signOut,requireSignin} = require('../controllers/auth');
const {runValidator} = require('../validators')
const {signUpValidator,signInValidator} = require('../validators/auth')

router.post('/signup',signUpValidator,runValidator,signUp)
router.post('/signin',signInValidator,runValidator,signIn)
router.get('/signout',signOut)


router.get('/secret',requireSignin,(req,res)=>{
    res.json({
        message:'You access to the secret page'
    })
})

module.exports = router;