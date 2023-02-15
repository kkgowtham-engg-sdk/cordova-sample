cordova.define("com.moe.uiplugin.MyPlugin", function(require, exports, module) {

var exec = require('cordova/exec');

var MyPlugin = function(){
  console.log('init Plugin');
}

function initPlugin(){
  console.log('init Plugin');
  var success = function(){
  console.log("Plugin Init Success");
  }

  var failure = function(){
    console.log("Plugin Init Failure");
  }
   exec(success, failure, 'MyPlugin', 'initPlugin');

  return new MyPlugin();
}

MyPlugin.prototype.greeting = function (arg0, success, error) {
    exec(success, error, 'MyPlugin', 'greeting', [arg0]);
};


MyPlugin.prototype.setUpCallback = function(arg0,success,error){
    exec(success,error,'MyPlugin','setUpCallback',[arg0])
}

MyPlugin.prototype.putStringInPref = function (message, success, error){
exec(success,error,'MyPlugin','putStringInPref',[message])
}

MyPlugin.prototype.getStringFromPref = function (key, success, error){
exec(success,error,'MyPlugin','getStringFromPref',[key])
}

MyPlugin.prototype.showDialog = function (message, success, error){
   console.log("Plugin Show Dialog");
    exec(success,error,'MyPlugin','showDialog',[message]);
}

MyPlugin.prototype.setForegroundPushListener = function(arg0,success,error){
   console.log("Plugin setForegroundPushListener");
   exec(success,error,'MyPlugin','setupPushMessageCallback',[arg0])
}


module.exports = {
   initPlugin: initPlugin,
   MyPlugin: MyPlugin
};
});
