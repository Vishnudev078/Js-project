var db=require('../config/connection')
var collection=require('../config/collections')
const  ObjectId  = require('mongodb').ObjectId
module.exports={
    productDet:(detId)=>{
        return new Promise(async(resolve, reject) => {
            try{
                 await db.get().collection(collection.PRODUCTS_COLLECTIONS).findOne({"_id":new ObjectId(detId)}).then((data)=>{
                      resolve(data);
                })
                
                 // Casts truthy/falsy value to boolean. This does in fact return a value from isUsernameTaken().
            } catch(err) {
                throw err;
            }
          
        })
    }
}