const express = require('express')
const router = express.Router()

const {runValidator} = require('../validators')
const {tagValidator} = require('../validators/tag')
const {requireSignin,adminMiddleware} = require('../controllers/auth');
const {create,list,read,remove}  =require('../controllers/tag')

router.post('/tag',tagValidator,runValidator,requireSignin,adminMiddleware,create)
router.get('/tags',list) 
router.get('/tag/:slug',read)
router.delete('/tag/:slug',requireSignin,adminMiddleware,remove)

module.exports = router;