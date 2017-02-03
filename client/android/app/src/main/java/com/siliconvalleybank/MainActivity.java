package com.siliconvalleybank;

import android.support.annotation.Nullable;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static android.content.ContentValues.TAG;

public class MainActivity extends ReactActivity {
    ReactContext mainreactContext;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SiliconValleyBank";
    }
    public void sendEvent(String eventName, @Nullable WritableMap params) {

        if(mainreactContext==null){
            //可以得到mainreactContext值
            mainreactContext = this.getReactNativeHost().getReactInstanceManager().getCurrentReactContext();
        }

            if (mainreactContext==null) {
                Log.i(TAG, "mainreactContext==null");
            }else{
                Log.i(TAG,"sendADEvent:"+params.toString());
                mainreactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, params);
            }
    }
}
