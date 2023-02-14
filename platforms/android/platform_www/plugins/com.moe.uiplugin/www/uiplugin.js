cordova.define("com.moe.uiplugin.uiplugin", function(require, exports, module) {
var exec = require('cordova/exec');

exports.coolMethod = function (arg0, success, error) {
    exec(success, error, 'uiplugin', 'coolMethod', [arg0]);
};


let dialog = function (){}

dialog.prototype.showDialog = function (message, success, error){
    exec(success,error,'uiplugin','showDialog',[message]);
}

module.exports = {
    dialog : dialog
}
});
