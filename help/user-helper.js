var db = require('../config/connection')
var collection = require('../config/collections1')
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
module.exports = {
    doSignup: (userdata) => {
        return new Promise(async (resolve, reject) => {
            if (!userdata.Password || userdata.Password.trim() === "") {
                reject(new Error('password field is required'));
                return;
            }
            try {
                userdata.Password = await bcrypt.hash(userdata.Password, 10);
                db.get().collection(collection.USER_COLLECTIONS).insertOne(userdata).then((data) => {
                  resolve(data.insertedId)
                })
            } catch (err) {
                console.error(err);
            }
        })
    },
    doLogin:(userdata)=>
    {
        return new Promise(async(resolve,reject)=>
        {
            let user=await db.get().collection(collection.USER_COLLECTIONS).findOne({Email:userdata.Email})
            if(user){
                bcrypt.compare(userdata.Password,user.Password).then((stat)=>{
                    if(stat)
                    {
                        console.log("login sucess");
                        response.user=user
                        response.stat=true;
                        resolve(response)
                    }else{
                          console.log("login failed");
                          resolve({stat:false})
                    }
                })
            }else{
                 console.log("fail");
            }
        })
    },

}