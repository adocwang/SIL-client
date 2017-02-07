package com.siliconvalleybank;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.siliconvalleybank.components.RxBus;
import com.xiaomi.mipush.sdk.MiPushMessage;
import rx.functions.Action1;
import rx.subscriptions.CompositeSubscription;

import static android.content.ContentValues.TAG;

public class MainActivity extends ReactActivity {
    ReactContext mainreactContext;
    private CompositeSubscription mSubscriptions = new CompositeSubscription();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mSubscriptions.add(RxBus.getDefault().toObservable().subscribe(new Action1<Object>() {
            @Override
            public void call(Object o) {
                Log.e("toObservable","receive msg");
                if (o instanceof MiPushMessage) {//聊天页面跳转音乐播放器页面
                    Log.e("receive MiPushMessage",((MiPushMessage) o).getContent());
                    WritableMap params = Arguments.createMap();
                    params.putString("desc","test");
                    sendEvent("MiPushMessage",params);
                }
            }}));
    }

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
                Log.i(TAG, "    ==null");
            }else{
                Log.i(TAG,"sendADEvent:"+params.toString());
                mainreactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, params);
            }
    }
}
