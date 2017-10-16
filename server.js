const express=require('express')
const hbs = require('hbs')
const fs=require('fs')
const port= process.env.PORT||3000;
var app=express();
app.set('view engine','hbs')
hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
  return text;
})
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`
  fs.appendFileSync('server.log',log+'\n',(err)=>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
  next();
})
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// })
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express</h1>');
  res.render('index.hbs',{
    name: 'Mohammed',
    likes:['Biking',
          'Cities'],
    PageTitle:'Home Page'

  })
})
app.get('/about',(req,res)=>{
res.render('about.hbs',{
  PageTitle: 'About Page',
})
})
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Uable to fillfull the request',
  })
})
app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
