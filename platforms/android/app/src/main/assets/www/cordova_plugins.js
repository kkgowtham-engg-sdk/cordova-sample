cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "com.moe.uiplugin.MyPlugin",
      "file": "plugins/com.moe.uiplugin/www/uiplugin.js",
      "pluginId": "com.moe.uiplugin",
      "clobbers": [
        "MyPlugin"
      ]
    },
    {
      "id": "cordova-moengage-core.MoECordova",
      "file": "plugins/cordova-moengage-core/www/MoECordova.js",
      "pluginId": "cordova-moengage-core",
      "clobbers": [
        "MoECordova"
      ]
    },
    {
      "id": "cordova-moengage-core.MoEConstants",
      "file": "plugins/cordova-moengage-core/www/MoEConstants.js",
      "pluginId": "cordova-moengage-core",
      "clobbers": [
        "MoEConstants"
      ]
    },
    {
      "id": "cordova-moengage-core.MoEJsonProvider",
      "file": "plugins/cordova-moengage-core/www/MoEJsonProvider.js",
      "pluginId": "cordova-moengage-core",
      "clobbers": [
        "MoEJsonProvider"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-device": "2.1.0",
    "cordova-plugin-demo": "1.0.0",
    "cordova.plugin.demo": "1.0.0",
    "com.moe.uiplugin": "1.0.0",
    "cordova-moengage-core": "8.1.0"
  };
});