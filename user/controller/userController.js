
var Promise = require('bluebird');
var userServices = require('../services/userServices');
var responses = require('../../config/common_response');
var commonConfig = require('../../config/common_config');



exports.customerSignup = customerSignup;
exports.customerLogin = customerLogin;
exports.getUserDataAuto = getUserDataAuto;
exports.getUserDataAwait = getUserDataAwait;
exports.getUserDataCoroutine = getUserDataCoroutine;
exports.getUserDataPromise = getUserDataPromise;
exports.readFsPromisify    = readFsPromisify;



function customerSignup(req, res) {

  const email = req.body.email === null || req.body.email === undefined ? '' : req.body.email;
  const phone = req.body.phone === null || req.body.phone === undefined ? '' : req.body.phone;
  let password = req.body.password === null || req.body.password === undefined ? '' : req.body.password;
  const name = req.body.name === null || req.body.name === undefined ? '' : req.body.name.trim();
  var access_token;

  async.waterfall([
    function (cb) {
      userServices.authenticateCustomer(email, (err, flag) => {
        if (err) {
          cb(err, null);
        }
        cb(null);
      });
    },
    function (cb) {
      access_token = md5(new Date() + email + phone);
      var dbObject = {
        email: email,
        phoneNumber: phone,
        password: password,
        access_token: access_token,
        name: name,
        createdAt: new Date().toString(),
      }
      userServices.insertCustomer(dbObject, (err, response) => {
        if (err) {
          cb(err, null);
        }
        else {
          cb(null);
        }

      })
    }
  ], (error, response) => {
    if (error) {
      return responses.sendCustomResponse(res, commonConfig.responseMessages.SERVER_ERROR, commonConfig.responseFlags.SERVER_ERROR);
    }
    return responses.sendCustomResponse(res, commonConfig.responseMessages.SUCCESS, commonConfig.responseFlags.SUCCESS);
  });
};


async function customerLogin(req, res) {
  try {
    let user = await authenticateCustomerPromise(req.body);

    if (user) {
      if (user.paswword == userDetails.paswword) {
        return user;
      } else {
        throw 'Password is inccorrect';
      }
    } else {
      throw 'User not found';
    }
  } catch (err) {
    console.log('error while login', err);
    throw err;
  }



}


function getUserDataAuto(req, res) {
  async.auto({
    firstFunc: (cb) => {
      setTimeout(function () {
        console.log("first function implementing");
        cb(null, [{ response: 'firstFunction' }]);
      }, 2000);
    },
    userData: ['firstFunc', (results, cb) => {

      dba.collection('userCollection').find().sort({ userId: -1 }).toArray(function (err, result) {
        if (err) {
          cb(err);
        }
        else if (result && result.length > 0) {
          cb(null, result);
        } else {
          cb(null, [{}]);
        }

      })
    }],
  }, function (error, result) {
    if (error) {
      return responses.sendCustomResponse(res, commonConfig.responseMessages.SERVER_ERROR, commonConfig.responseFlags.SERVER_ERROR);
    }
    responseData = {};
    responseData.first = result.firstFunc;
    responseData.second = result.userData
    return responses.sendCustomResponse(res, commonConfig.responseMessages.SUCCESS, commonConfig.responseFlags.SUCCESS, responseData);
  })

}


async function getUserDataAwait(req, res) {

  try {
    let data = await dba.collection('userCollection').find().sort({ userId: -1 }).toArray();
    return responses.sendCustomResponse(res, commonConfig.responseMessages.SUCCESS, commonConfig.responseFlags.SUCCESS, data);
  } catch (error) {
    return responses.sendCustomResponse(res, commonConfig.responseMessages.SERVER_ERROR, commonConfig.responseFlags.SERVER_ERROR);
  }
}


function getUserDataCoroutine(req, res) {
  Promise.coroutine(function* () {

    var userData = yield dba.collection('userCollection').find().sort({ userId: -1 }).toArray();
    return {
      message: commonConfig.responseMessages.SUCCESS,
      status: commonConfig.responseFlags.SUCCESS,
      data: userData
    };

  })().then((data) => {
    return responses.sendCustomResponse(res, data.message, data.status, data.data);
  }, (error) => {
    return responses.sendCustomResponse(res, error, commonConfig.responseFlags.SERVER_ERROR);
  });

}


function getUserDataPromise(req, res) {

  const checkPromise = new Promise((resolve, reject) => {
    const mongoCollection = dba.collection('userCollection');
    let ResultData = mongoCollection.find({}).sort({ userId: -1 }).toArray(function (err, result) {
      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });

  });

  checkPromise.then(function (data) {
   return  responses.sendCustomResponse(res, commonConfig.responseMessages.SUCCESS, commonConfig.responseFlags.SUCCESS, data);
  }).catch(function (err) {
    return responses.sendCustomResponse(res, err, commonConfig.responseFlags.SERVER_ERROR);
    
  })

}

function readFsPromisify(req, res){

  var fs = Promise.promisifyAll(require("fs")); 
  var directory = "content";
  
  var getFiles = function () {
      return fs.readdirAsync(directory);
  };
  var getContent = function (filename) {
      return fs.readFileAsync('../../' + directory + filename, "utf8");
  };
  
  getFiles().map(function (filename) {
      return getContent(filename);
  }).then(function (content) {
     let data ={
       content: content
       
     };
     return  responses.sendCustomResponse(res, commonConfig.responseMessages.SUCCESS, commonConfig.responseFlags.SUCCESS, data);

  }).catch((err)=>{

   return responses.sendCustomResponse(res, err, commonConfig.responseFlags.SERVER_ERROR);

  })







}

