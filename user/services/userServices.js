
const database = require('../../connect2');
const responses                   = require('../../config/common_response');
const commonConfig                = require('../../config/common_config');

exports.authenticateCustomer = authenticateCustomer;
exports.insertCustomer       = insertCustomer;
exports.authenticateCustomerPromise = authenticateCustomerPromise;

function authenticateCustomer(email, callback) {

  let cred = dba.collection('userCollection');
  cred.findOne({ email: email }, (err, response) => {
    if (err) {
      callback(commonConfig.responseFlags.SERVER_ERROR, null);
    }
    else if (response.length > 0) {
      callback(commonConfig.responseMessages.EMAIL_ALREADY_EXISTS, null);
    } else {
      callback(null);
    }
  })

}


function insertCustomer(obj, callback){
 
  let cred = dba.collection('userCollection');
  cred.insertOne(obj,(err, result)=>{
    if (err) {
      callback(commonConfig.responseFlags.SERVER_ERROR, null);
    }
    else{
      cb(null);
    }


  });



}

 function authenticateCustomerPromise(body){
   return new Promise((resolve , reject)=>{
  let cred = dba.collection('userCollection');
    cred.find({ email: body.email}, (err, response) => {
      if (err) {
        reject({message:commonConfig.responseMessages.SERVER_ERROR,status:commonConfig.responseFlags.SERVER_ERROR});
      }
      else if (response.length > 0 && response.phoneNumber === body.phoneNumber) {
        reject({message:commonConfig.responseMessages.SERVER_ERROR,status:commonConfig.responseFlags.SERVER_ERROR});
      } else {
        resolve(response)
      }
    })



   })
   
 }




