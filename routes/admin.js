var express = require('express');
var router = express.Router();
var productHelp=require('../help/product-help')

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelp.getAllProducts().then((products)=>
  {
    res.render('admin/view-products',{admin:true,products});
  })
  
});
router.get('/add-products',function(req,res)
{
  res.render('admin/add-products',{admin:true})
})
module.exports = router;

router.post('/add-products',(req,res)=>
{
  

  productHelp.addProducts(req.body,(id)=>
  { let image=req.files.Image
    image.mv("./public/product-image/"+id+'.jpg',(err,done)=>{

      if(!err)
      {
        res.render("admin/add-products",{admin:true})
      }
    })
     
         
  })

})
