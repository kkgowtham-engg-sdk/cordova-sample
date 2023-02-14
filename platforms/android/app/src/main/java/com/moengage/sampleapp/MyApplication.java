package com.moengage.sampleapp;

import android.app.Application;

import com.moengage.sampleapp.R;
import com.moengage.cordova.MoEInitializer;
import com.moengage.core.LogLevel;
import com.moengage.core.MoEngage;
import com.moengage.core.config.FcmConfig;
import com.moengage.core.config.LogConfig;
import com.moengage.core.config.NotificationConfig;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        MoEngage.Builder moEngageBuilder = new MoEngage.Builder(this, "DAO6UGZ73D9RTK8B5W96TPYN")
                .configureNotificationMetaData(
                        new NotificationConfig(
                                R.drawable.common_google_signin_btn_icon_dark,
                                R.drawable.common_google_signin_btn_icon_dark,
                                -1,
                                false, true, true
                        )
                )
                .configureLogs(new LogConfig(LogLevel.VERBOSE, true))
                .configureFcm(new FcmConfig(true));
        MoEInitializer.initialiseDefaultInstance(this, moEngageBuilder);
    }
}
