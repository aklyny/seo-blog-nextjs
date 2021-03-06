const express = require('express')
const router = express.Router()

const {runValidator} = require('../validators')
const {categoryCreateValidator} = require('../validators/category')
const {requireSignin,adminMiddleware} = require('../controllers/auth');
const {create,list,read,remove}  =require('../controllers/category')

router.post('/category',categoryCreateValidator,runValidator,requireSignin,adminMiddleware,create)
router.get('/categories',list)
router.get('/category/:slug',read)
router.delete('/category/:slug',requireSignin,adminMiddleware,remove)

module.exports = router;