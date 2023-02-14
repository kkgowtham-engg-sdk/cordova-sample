cordova.define("com.moe.uiplugin.uiplugin", function(require, exports, module) {

var exec = require('cordova/exec');

dialog.prototype.coolMethod = function (arg0, success, error) {
    exec(success, error, 'uiplugin', 'coolMethod', [arg0]);
};


dialog.prototype.setUpCallback = function(arg0,success,error){
    exec(success,error,'uiplugin','setUpCallback',[arg0])
}


dialog.prototype.putStringInPref = function (message, success, error){
exec(success,error,'uiplugin','putStringInPref',message)
}

dialog.prototype.showDialog = function (message, success, error){
    exec(success,error,'uiplugin','showDialog',[message]);
}

module.exports = {
    greet: function (name, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "Hello", "greet", [name]);
    },
    putStringInPref : putStringInPref,
    dialog: showDialog,
    coolMethod: coolMethod,
    setUpCallback : setUpCallback,
    putStringInPref: putStringInPref
};
});