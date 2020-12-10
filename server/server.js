const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

require('dotenv').config()
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
// db
mongoose.connect('mongodb://localhost:27017/blog-seo',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    .then(()=>console.log('DB Connected'))
    .catch((err)=>{console.log(err)})

//app

const  app = express()


//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser())

//cors
if(process.env.NODE_ENV==='development'){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}))
}
//routes 
app.use('/api',blogRoutes)
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',tagRoutes);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running in port ${port}`)
})