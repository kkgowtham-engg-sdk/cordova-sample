package com.moe.uiplugin;

import android.os.Handler;
import android.os.Looper;

import org.apache.cordova.PluginResult;


public class EventEmitter {

    static void emitEmitDelayedEvent(){
        final Handler handler = new Handler(Looper.getMainLooper());
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,"Sample Message");
                CallbackHelper.context.sendPluginResult(pluginResult);
            }
        }, 10000);
    }
}
