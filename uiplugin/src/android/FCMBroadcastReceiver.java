package com.moe.uiplugin;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.legacy.content.WakefulBroadcastReceiver;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Set;

public class FCMBroadcastReceiver extends WakefulBroadcastReceiver {

    private static final String FCM_RECEIVE_ACTION = "com.google.android.c2dm.intent.RECEIVE";
    private static final String FCM_TYPE = "gcm";
    private static final String MESSAGE_TYPE_EXTRA_KEY = "message_type";

    private final String TAG = FCMBroadcastReceiver.class.getSimpleName();

    private static boolean isFCMMessage(Intent intent) {
        if (FCM_RECEIVE_ACTION.equals(intent.getAction())) {
            String messageType = intent.getStringExtra(MESSAGE_TYPE_EXTRA_KEY);
            return (messageType == null || FCM_TYPE.equals(messageType));
        }
        return false;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        // Do not process token update messages here.
        // They are also non-ordered broadcasts.
        Bundle bundle = intent.getExtras();
        if (bundle == null || "google.com/iid".equals(bundle.getString("from")))
            return;

        Log.d(TAG,"FCM Message Received"+bundle.toString());
        if (CallbackHelper.firebasePushReceiveCallback!=null) {
            CallbackHelper.firebasePushReceiveCallback.success(convertBundleToJson(bundle).toString());
        }
    }

    public JSONObject convertBundleToJson(Bundle bundle) {
        JSONObject json = new JSONObject();
        Set<String> keys = bundle.keySet();

        for (String key : keys) {
            try {
                if (bundle.get(key) != null && bundle.get(key).getClass().getName().equals("android.os.Bundle")) {
                    Bundle nestedBundle = (Bundle) bundle.get(key);
                    json.put(key, convertBundleToJson(nestedBundle));
                } else {
                    json.put(key, JSONObject.wrap(bundle.get(key)));
                }
            } catch(JSONException e) {
                System.out.println(e.toString());
            }
        }

        return json;
    }

}
