const commonConfig = require("../config/common_config");

exports.sendCustomResponse = function(res, message, status, data){
    message = message? message : commonConfig.responseMessages.SUCCESS;
    status  = status? status : commonConfig.responseFlags.SUCCESS;
    data    = data? data : {};
    res.send({message, status, data});
    return -1;
}