var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
var productHelp=require('../help/product-help')
var productDetail=require('../help/product-view')
const userHelper=require('../help/user-helper')
const verifyLogin=(req,res,next)=>{
   if(req.session.loggedIn)
   {
      next()
   }
   else{
      res.redirect('/login')
   }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
 /* console.log(user)*/
  productHelp.getAllProducts().then((products)=>
  {
   ;
    res.render('user/view-products',{admin:false,products,user});
  })
});
router.get('/login',(req,res)=>
{
   if(req.session.loggedIn){
      res.redirect('/')
   }
   else{
   res.render('user/login',{admin:false,"loginError":req.session.loginError});
   req.session.loginError=false
   }
})
router.get('/signup',(req,res)=>
{
   res.render('user/signup',{admin:false});
})
router.post('/signup',jsonParser,function(req,res){
   
   userHelper.doSignup(req.body).then((respond)=>
   {
     
   })
})
router.post('/login',(req,res)=>{
   userHelper.doLogin(req.body).then((response)=>{
      if(response.stat){    
         req.session.loggedIn=true;
         req.session.user=response.user;
         res.redirect('/')
      }else{
         req.session.loginError="Invalid username or password"
         res.redirect('/login')
      }
   })
});
router.get('/logout',(req,res)=>{
   req.session.destroy()
   res.redirect('/')
});
router.get('/cart',verifyLogin,(req,res)=>{
   res.render('user/cart')
});

router.get('/detail',(req,res,next)=>{
let detId=req.query.id 
productDetail.productDet(detId).then((product)=>{
  //console.log(product);
  res.render('user/product-detail',{admin:false,product})
})
});
router.get('/delete',(req,res)=>{
   let delId=req.query.id
   productHelp.deleteProduct(delId).then((response)=>{
       res.redirect('/admin/')
   })
})
module.exports = router;
