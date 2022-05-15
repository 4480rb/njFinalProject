const express= require('express');
const app=express();
const user=require('./routes/user');
//mongoDb.connect();
// //const mongoDb=require('./DB/mongoDb');
// const product=require('./routes/product');
const mongoose=require('./DB/mongooseDb');
const userMongoose=require('./routes/user');
const category=require('./routes/categorya1');
const Product=require('./routes/Products1');
const order=require('./routes/Orders1');
const logger=require('./log/logger');
const path=require('path');
app.use(express.static('Static'));
const env=require('./config');
const port=env.port;


app.use(express.json()) 
mongoose.connect();
app.use('/api/Users',user);
app.use('/api/Product',Product);
app.use('/api/userMongoose',userMongoose);
app.use('/api/Category',category);
app.use('/api/Orders',order);

app.use((err,req,res,next)=>{
  if(env.environment=='DEVELOPMENT')
   nDate = new Date().toLocaleString('en-IL', {
    timeZone: 'Israel'
  });   
  console.log(nDate);
    logger.error(err)   
        res.status(500).send('Something failed!') 
}) 
  app.use((req,res)=>{
res.status(404).sendFile(path.join(__dirname,'./Static/html/404.html'))
  })
app.listen(port,()=>{
  if(env.environment=='DEVELOPMENT')
   logger.info(`hello from my server on port ${port}`);
   const nDate = new Date().toLocaleString('en-IL', {
    timeZone: 'Israel'
  }); 
  console.log(nDate);
});


    


