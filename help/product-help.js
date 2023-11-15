var db=require('../config/connection')
var collection=require('../config/collections')
const  ObjectId  = require('mongodb').ObjectId
module.exports={

    addProducts:(product,getback)=>
    {
       // console.log(product)
        db.get().collection("product").insertOne(product).then((data)=>
        {
            
            getback(data.insertedId.toString())
            
        })
    },
    getAllProducts:()=>
    {
        return new Promise(async(resolve,reject)=>
        {
           let products= await db.get().collection(collection.PRODUCTS_COLLECTIONS).find().toArray()
           resolve(products)
        })
    },
    deleteProduct:(delId)=>{
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCTS_COLLECTIONS).deleteOne({"_id":new ObjectId(delId)}).then((response)=>{
                //console.log(response);
                resolve(response)
            })
        })
    }
}
//already used promise 