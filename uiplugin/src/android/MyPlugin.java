package com.moe.uiplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;


import com.moengage.inapp.MoEInAppHelper;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class MyPlugin extends CordovaPlugin {

    private static final String TAG = MyPlugin.class.getSimpleName();
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(action.equals("init")){
            Log.d(TAG,"Plugin Intialized");
            return true;
        }else if (action.equals("greeting")) {
            String message = args.getString(0);
            Toast.makeText(this.cordova.getContext(), message,Toast.LENGTH_LONG).show();
            new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                @Override
                public void run() {
                    String replyMessage = "Hi,I am responding From Native";
                    callbackContext.success(replyMessage);
                }
            },3000);
            return true;
        } else if (action.equals("showDialog")) {
            String message = args.getString(0);
            Log.d(TAG,"Showing Native Dialog");
            this.showDialog(message, callbackContext);
            return true;
        } else if (action.equals("callMoENativeFunction")) {
            this.callMoENativeFunction();
            return true;
        } else if (action.equals("setUpCallback")) {
            CallbackHelper.context = callbackContext;
            EventEmitter.emitEmitDelayedEvent();
            return true;
        }else if (action.equals("setupPushMessageCallback")){
            CallbackHelper.firebasePushReceiveCallback = callbackContext;
            Log.d(TAG,"Firebase PushReceiver listener Set Successfully");
            return true;
        }else if (action.equals("putStringInPref")) {
            Log.d(TAG,"putStringInPref: Native");
            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        String jsonString = args.getString(0);
                        JSONObject jsonObject = new JSONObject(jsonString);
                        String key = jsonObject.getString("key");
                        String value = jsonObject.getString("value");
                        Log.d("TAG","Key:"+key+",Value:"+value);
                        putStringInPref(key,value, callbackContext);
                    } catch (Exception e) {
                        callbackContext.error(e.getMessage());
                    }
                }
            });
            return true;
        }else if (action.equals("getStringFromPref")){
            Log.d(TAG,"getStringFromPref: Native");
            getStringFromPref(args.getString(0),callbackContext);
        }
        return false;
    }


    private void showDialog(String message, CallbackContext callbackContext) {
        Context context = this.cordova.getActivity();
        AlertDialog.Builder builder1 = new AlertDialog.Builder(context);
        builder1.setMessage(message);
        builder1.setCancelable(true);

        builder1.setPositiveButton(
                "Yes",
                (dialog, id) -> {
                    dialog.cancel();
                    callbackContext.success("Clicked Yes");
                });

        builder1.setNegativeButton(
                "No",
                (dialog, id) -> {
                    dialog.cancel();
                    callbackContext.success("Clicked No");
                });

        AlertDialog alert11 = builder1.create();
        alert11.show();
    }

    private void callMoENativeFunction() {
        MoEInAppHelper.getInstance().showInApp(cordova.getActivity());
    }

    public SharedPreferences getSharedPreferences(String name) {
        Activity activity = cordova.getActivity();
        return activity.getSharedPreferences(name, Activity.MODE_PRIVATE);
    }

    private void putStringInPref(String key, String value, CallbackContext callbackContext) {
        String name = "sample_pref";

        boolean success = getSharedPreferences(name)
                .edit()
                .putString(key, value)
                .commit();

        if (success) {
            callbackContext.success("Saved In Preferences");
            return;
        }
        callbackContext.error("FAILED_TO_WRITE");
    }

    private void getStringFromPref(String key, CallbackContext callbackContext) {
        String name = "sample_pref";
        Log.d(TAG,"getStringFromPref: "+key);
        String value = getSharedPreferences(name).getString(key,"DefaultValue");

        if (value!=null) {
            callbackContext.success(value);
            return;
        }
        callbackContext.error("FAILED_TO_WRITE");
    }
}
