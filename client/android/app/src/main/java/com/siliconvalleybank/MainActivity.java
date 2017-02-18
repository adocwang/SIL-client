package com.siliconvalleybank;

import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.siliconvalleybank.components.RxBus;
import com.siliconvalleybank.event.ForeGroundNotifyEvent;
import com.siliconvalleybank.event.PassThroughEvent;
import rx.functions.Action1;
import rx.subscriptions.CompositeSubscription;

import static android.content.ContentValues.TAG;

public class MainActivity extends ReactActivity {
    ReactContext mainreactContext;
    private CompositeSubscription mSubscriptions = new CompositeSubscription();
    private boolean mSendMsg = false;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        mSubscriptions.add(RxBus.getDefault().toObservable().subscribe(new Action1<Object>() {
            @Override
            public void call(Object o) {
                if (o instanceof PassThroughEvent) {
                    Log.e("send  MiPushMessage ","type 1");
                    String content = ((PassThroughEvent) o).getMiPushMessage().getContent();
                    WritableMap params = Arguments.createMap();
                    params.putString("content",content);
                    params.putString("type","1");
                    sendEvent("MiPushMessage",params);
                }else if(o instanceof ForeGroundNotifyEvent){
                    Log.e("send  MiPushMessage ","type 2");
                    String content = ((ForeGroundNotifyEvent) o).getMiPushMessage().getContent();
                    WritableMap params = Arguments.createMap();
                    params.putString("content",content);
                    params.putString("type","2");
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

    @Override
    protected void onResume() {
        super.onResume();
        if(getIntent()!=null && getIntent().getExtras()!=null && getIntent().getExtras().getString("content")!=null && !mSendMsg){

            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    Log.e("send  MiPushMessage ","type 3");
                    String content = getIntent().getExtras().getString("content");
                    WritableMap params = Arguments.createMap();
                    params.putString("content",content);
                    params.putString("type","3");
                    sendEvent("MiPushMessage",params);
                    mSendMsg = true;
                }
            },1500);
        }
    }
}
