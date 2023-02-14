package com.moe.uiplugin.uiplugin;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;


import com.moengage.inapp.MoEInAppHelper;

import org.json.JSONArray;
import org.json.JSONException;

/**
 * This class echoes a string called from JavaScript.
 */
public class uiplugin extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("greeting")) {
            String name = args.getString(0);
            String message = "Hello, " + name;
            callbackContext.success(message);
            return true;
        } else if (action.equals("showDialog")) {
            String message = args.getString(0);
            this.showDialog(message, callbackContext);
        } else if (action.equals("callMoENativeFunction")) {
            this.callMoENativeFunction();
        } else if (action.equals("setUpCallback")) {
            CallbackHelper.context = callbackContext;
            EventEmitter.emitEmitDelayedEvent();
        } else if (action.equals("putStringInPref")) {

            cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        putStringInPref(args.getString(0), callbackContext);
                    } catch (Exception e) {
                        callbackContext.error(e.getMessage());
                    }
                }
            });
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
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        callbackContext.success("Clicked Yes");
                    }
                });

        builder1.setNegativeButton(
                "No",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        callbackContext.success("Clicked No");
                    }
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

    private void putStringInPref(String message, CallbackContext callbackContext) {
        String name = "sample_pref";

        boolean success = getSharedPreferences(name)
                .edit()
                .putString("key", message)
                .commit();

        if (success) {
            callbackContext.success();
            return;
        }
        callbackContext.error("FAILED_TO_WRITE");
    }
}
