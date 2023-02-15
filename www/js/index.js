document.addEventListener('deviceready', onDeviceReady, false);

var moe;
var myPlugin;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    initPlugins();
    fetchDeviceDetails();

    moe.trackEvent("Cordova Initialized");

    setMoEngageListeners();
    var successCallback = function(message) {
        console.log(message)
    }
    var errorCallback = function(err) {
        console.log(err)
    }

    setUpButtonClick();
    handleSharedPreferenceCTA();
}

function setFirebasePushCallback() {
    console.log('setFirebasePushCallback()');
    var foregroundPushMessageListenerSuccess = function(value) {
        var pushMessage = JSON.parse(value);
        alert(pushMessage["gcm_alert"]);
    }
    var foregroundPushMessageListenerFailure = function(errorCallback) {
        alert("Foreground Push Receive Init Failure:", errorCallback);
    }
    myPlugin.setForegroundPushListener("initFirebase", foregroundPushMessageListenerSuccess, foregroundPushMessageListenerFailure);

}

function showInApp() {
    console.log('show In App');
    moe.showInApp();
}

function showNativeDialog() {
    console.log('show Native Dialog');
    myPlugin.showDialog("Some Message", function(message) {
        console.log("Native Dialog Loading Success");
        alert(message);
    }, function(errorCallback) {
        console.log("Native Dialog Loading Failure:", errorCallback);
    });
}

function requestEmail() {
    let email = prompt('Enter email');
    moe.setEmail(email);
    moe.setEmail(email);
}

function updateAttributes() {
    moe.setUserName("gowthamkk");
    moe.setFirstName("Gowtham");
    moe.setLastName("KK");
    moe.setPhoneNumber(9876543210);
    moe.setGender("Male");
    moe.setLocation(25.23, 73.23);
    moe.setUserAttributeISODateString("LastPurchaseDate", "1970-01-01T12:00:00Z");
}

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}


function initPlugins(){
    moe = MoECordova.init("DAO6UGZ73D9RTK8B5W96TPYN");
    myPlugin = MyPlugin.initPlugin();
}

function fetchDeviceDetails(){
    let element = document.getElementById('deviceDetailsList');
    let data = [];

    data.push("Manufacturer:" + device.manufacturer);
    data.push("Model:" + device.model);
    data.push("Serial:" + device.serial);
    data.push("UUid:" + device.uuid);
    data.push("Manufacturer:" + device.manufacturer);
    data.push("Version:" + device.version);
    data.push("Cordova:" + device.cordova);

    let list = document.getElementById("deviceDetailsList");

    data.forEach((item) => {
        let li = document.createElement("li")
        li.innerText = item;
        list.appendChild(li);
    });
}

function setMoEngageListeners(){
    moe.on('onInAppShown', function(inAppInfo) {
        console.log('onInAppShown() :: callback received.InApp Shown with Info: ' + JSON.stringify(inAppInfo));
    });
    moe.on('onInAppDismiss', function(inAppInfo) {
        console.log('In App dismissed');
        alert("InApp dismissed");
    });
}


function handleSharedPreferenceCTA(){
    document.getElementById("saveMessageInPref").onclick = function() {
        let keyValue = prompt('Enter Key Value separated By :').split(":");
        myPlugin.putStringInPref(JSON.stringify({
            "key": keyValue[0],
            "value": keyValue[1]
        }), successCallback, errorCallback)
    }

    document.getElementById("getMessageFromPref").onclick = function() {
        var key = prompt("Enter Key for Fetching Value From Pref");
        var success = function(value) {
            alert(value);
        }
        var failure = function(errorCallback) {
            alert("Error Fetching Data From Pref:", errorCallback);
        }
        myPlugin.getStringFromPref(key, success, failure);
    }
}

function setUpButtonClick(){
    document.getElementById('showInApp').onclick = showInApp
    document.getElementById('emailBtn').onclick = requestEmail
    document.getElementById('showDialog').onclick = showNativeDialog
    document.getElementById('fcmMessageCallBackBtn').onclick = setFirebasePushCallback
    document.getElementById('setBirthDate').onclick = setBirthDate
    document.getElementById('setUniqueId').onclick = setUniqueUserId
    document.getElementById('updateAttributes').onclick = updateAttributes
    document.getElementById('trackMoeEvent').onclick = trackMoeEvent
    document.getElementById('sendMessage').onclick = function(){
            var success = function(value) {
                alert(value);
            }
            var failure = function(errorCallback) {
                alert("Error Fetching Data From Pref:", errorCallback);
            }

      myPlugin.greeting("Hello From Hybrid",success,failure);
    }
}

function setBirthDate(){
  var date = document.getElementById("birthdate").valueAsDate.toISOString();
  moe.setBirthdate(date);
}

function setUniqueUserId(){
    var userId = createUUID();
    alert('Unique User Id: \n'+userId);
    moe.setUniqueId(userId);
}

function trackMoeEvent(){
    var event = prompt("Track Event");
    moe.trackEvent(event);
    moe.trackEvent( { "event1": "Click", "evenId": 123, "isLandEvent": false ,"date":"19-08-1998"});
   console.log('Moe Event Tracking');
}