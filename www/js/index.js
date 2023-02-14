/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready





document.addEventListener('deviceready', onDeviceReady, false);

var moe;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');



    var success = function(message) {
        alert(message);
    }

    var failure = function() {
        alert("Error calling Hello Plugin");
    }

    hello.greet("World", success, failure);


    moe = MoECordova.init("DAO6UGZ73D9RTK8B5W96TPYN");

    let element = document.getElementById('deviceDetailsList');
    let data = [];

    data.push("Manufacturer:"+device.manufacturer);
    data.push("Model:"+device.model);
    data.push("Serial:"+device.serial);
    data.push("UUid:"+device.uuid);
    data.push("Manufacturer:"+device.manufacturer);
    data.push("Version:"+device.version);
    data.push("Cordova:"+device.cordova);

    let list = document.getElementById("deviceDetailsList");

    data.forEach((item)=>{
        let li = document.createElement("li")
        li.innerText = item;
        list.appendChild(li);
    });


    moe.on('onInAppShown', function (inAppInfo) {
        console.log('onInAppShown() :: callback received.InApp Shown with Info: ' + JSON.stringify(inAppInfo));
    });
    moe.trackEvent("Cordova Initialized");

    var successCallback = function(message) {
        console.log(message)
    }
    var errorCallback = function(err) {
        console.log(err)
    }

document.getElementById("saveMessageInPref").onclick = function(){
    putStringInPref.get("Hi Pref!", successCallback, errorCallback)
}


}

fun showInApp(){
moe.showInApp();
}


function requestEmail() {
    let email = prompt('Enter email');
    moe.setEmail(email);
}


fun updateAttributes(){
    moe.setUniqueId(createUUID);
    moe.setUserName("gowthamkk");
    moe.setFirstName("Gowtham");
    moe.setLastName("KK");
    moe.setEmail("gowtham.kk@moengage.com");
    moe.setPhoneNumber(9876543210);
    moe.setGender("Male");
    moe.on('onInAppDismiss', function (inAppInfo) {
            console.log('In App dismissed');
            alert("InApp dismissed");
    });
    moe.setBirthdate("1970-01-01T12:00:00Z");
    moe.setLocation(25.23, 73.23);
    moe.setUserAttributeISODateString("LastPurchaseDate", "1970-01-01T12:00:00Z");
}

function createUUID() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}