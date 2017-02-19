package com.siliconvalleybank;

import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.xiaomi.mipush.sdk.MiPushClient;

/**
 * Created by kiefer on 2017/2/19.
 */

public class RemotePushManagerModule extends ReactContextBaseJavaModule {

        private static final String DURATION_SHORT_KEY = "SHORT";
        private static final String DURATION_LONG_KEY = "LONG";

        public RemotePushManagerModule(ReactApplicationContext reactContext) {
                super(reactContext);
        }

        @Override
        public String getName() {
                return "RemotePushManager";
        }

        @ReactMethod
        public void setPushAlias(String phone) {
                MiPushClient.setAlias(MainApplication.getInstance(),phone,null);
        }

        @ReactMethod
        public void clearPushAlias() {
                MiPushClient.setAlias(MainApplication.getInstance(),"",null);
        }

        @ReactMethod
        public void getPlatform(Callback successCallback) {
                try {
                        successCallback.invoke(null,"android");
                }catch (Exception e){

                }
        }
}
