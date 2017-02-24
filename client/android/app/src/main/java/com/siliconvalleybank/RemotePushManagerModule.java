package com.siliconvalleybank;

import com.facebook.react.bridge.*;
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
                MiPushClient.clearNotification(MainApplication.getInstance());
        }

        @ReactMethod
        public void getPlatform(Callback successCallback) {
                try {
                        WritableArray list = Arguments.createArray();
                        list.pushString("android");
                        successCallback.invoke(null,list);
                }catch (Exception e){

                }
        }
}
