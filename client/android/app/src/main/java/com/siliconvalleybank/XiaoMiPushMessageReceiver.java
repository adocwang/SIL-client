package com.siliconvalleybank;

import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.text.TextUtils;
import android.util.Log;
import com.siliconvalleybank.components.RxBus;
import com.siliconvalleybank.components.Utils;
import com.siliconvalleybank.event.ForeGroundNotifyEvent;
import com.siliconvalleybank.event.PassThroughEvent;
import com.xiaomi.mipush.sdk.*;

import java.util.List;

/**
 * Created by kiefer on 2017/2/5.
 */

/**
 * 1、PushMessageReceiver 是个抽象类，该类继承了 BroadcastReceiver。<br/>
 * 2、需要将自定义的 DemoMessageReceiver 注册在 AndroidManifest.xml 文件中：
 * <pre>
 * {@code
 *  <receiver
 *      android:name="com.xiaomi.mipushdemo.DemoMessageReceiver"
 *      android:exported="true">
 *      <intent-filter>
 *          <action android:name="com.xiaomi.mipush.RECEIVE_MESSAGE" />
 *      </intent-filter>
 *      <intent-filter>
 *          <action android:name="com.xiaomi.mipush.MESSAGE_ARRIVED" />
 *      </intent-filter>
 *      <intent-filter>
 *          <action android:name="com.xiaomi.mipush.ERROR" />
 *      </intent-filter>
 *  </receiver>
 *  }</pre>
 * 3、DemoMessageReceiver 的 onReceivePassThroughMessage 方法用来接收服务器向客户端发送的透传消息。<br/>
 * 4、DemoMessageReceiver 的 onNotificationMessageClicked 方法用来接收服务器向客户端发送的通知消息，
 * 这个回调方法会在用户手动点击通知后触发。<br/>
 * 5、DemoMessageReceiver 的 onNotificationMessageArrived 方法用来接收服务器向客户端发送的通知消息，
 * 这个回调方法是在通知消息到达客户端时触发。另外应用在前台时不弹出通知的通知消息到达客户端也会触发这个回调函数。<br/>
 * 6、DemoMessageReceiver 的 onCommandResult 方法用来接收客户端向服务器发送命令后的响应结果。<br/>
 * 7、DemoMessageReceiver 的 onReceiveRegisterResult 方法用来接收客户端向服务器发送注册命令后的响应结果。<br/>
 * 8、以上这些方法运行在非 UI 线程中。
 *
 * @author mayixiang
 */
public class XiaoMiPushMessageReceiver extends PushMessageReceiver {
        private String mRegId;
        private long mResultCode = -1;
        private String mReason;
        private String mCommand;
        private String mMessage;
        private String mTopic;
        private String mAlias;
        private String mUserAccount;
        private String mStartTime;
        private String mEndTime;

        @Override
        public void onReceivePassThroughMessage(Context context, MiPushMessage message) {
                mMessage = message.getContent();
                if (!TextUtils.isEmpty(message.getTopic())) {
                        mTopic = message.getTopic();
                } else if (!TextUtils.isEmpty(message.getAlias())) {
                        mAlias = message.getAlias();
                } else if (!TextUtils.isEmpty(message.getUserAccount())) {
                        mUserAccount = message.getUserAccount();
                }
                RxBus.getDefault().send(new PassThroughEvent(message));
                Log.e("xiaomiPush",message.getContent());
        }

        @Override
        public void onNotificationMessageClicked(Context context, MiPushMessage message) {
                mMessage = message.getContent();
                if (!TextUtils.isEmpty(message.getTopic())) {
                        mTopic = message.getTopic();
                } else if (!TextUtils.isEmpty(message.getAlias())) {
                        mAlias = message.getAlias();
                } else if (!TextUtils.isEmpty(message.getUserAccount())) {
                        mUserAccount = message.getUserAccount();
                }

                if(Utils.isAppIsInBackground(context)){
                        Log.e("App","Background");
                        openActivity(context,message.getContent());
                }else {
                        RxBus.getDefault().send(new ForeGroundNotifyEvent(message));
                        Log.e("App","Foreground");
                }


        }

        private void openActivity(final Context context, final String content) {

                Handler handler = new Handler(context.getMainLooper());
                handler.post(new Runnable() {
                        @Override
                        public void run() {
                                Intent intent = new Intent(context, MainActivity.class);
                                intent.putExtra("content", content);
                                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                                context.getApplicationContext().startActivity(intent);
                        }
                });
        }

        @Override
        public void onNotificationMessageArrived(Context context, MiPushMessage message) {
                mMessage = message.getContent();
                if (!TextUtils.isEmpty(message.getTopic())) {
                        mTopic = message.getTopic();
                } else if (!TextUtils.isEmpty(message.getAlias())) {
                        mAlias = message.getAlias();
                } else if (!TextUtils.isEmpty(message.getUserAccount())) {
                        mUserAccount = message.getUserAccount();
                }
                if(Utils.isAppIsInBackground(context)){
                        Log.e("App","Background");
                       // openActivity(context,message.getContent());
                }else {
                        RxBus.getDefault().send(new PassThroughEvent(message));
                        Log.e("App","Foreground");
                }
        }

        @Override
        public void onCommandResult(Context context, MiPushCommandMessage message) {
                String command = message.getCommand();
                List<String> arguments = message.getCommandArguments();
                String cmdArg1 = ((arguments != null && arguments.size() > 0) ? arguments.get(0) : null);
                String cmdArg2 = ((arguments != null && arguments.size() > 1) ? arguments.get(1) : null);
                if (MiPushClient.COMMAND_REGISTER.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mRegId = cmdArg1;
                        }
                } else if (MiPushClient.COMMAND_SET_ALIAS.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mAlias = cmdArg1;
                        }
                } else if (MiPushClient.COMMAND_UNSET_ALIAS.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mAlias = cmdArg1;
                        }
                } else if (MiPushClient.COMMAND_SUBSCRIBE_TOPIC.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mTopic = cmdArg1;
                        }
                } else if (MiPushClient.COMMAND_UNSUBSCRIBE_TOPIC.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mTopic = cmdArg1;
                        }
                } else if (MiPushClient.COMMAND_SET_ACCEPT_TIME.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mStartTime = cmdArg1;
                                mEndTime = cmdArg2;
                        }
                }
        }

        @Override
        public void onReceiveRegisterResult(Context context, MiPushCommandMessage message) {
                String command = message.getCommand();
                List<String> arguments = message.getCommandArguments();
                String cmdArg1 = ((arguments != null && arguments.size() > 0) ? arguments.get(0) : null);
                String cmdArg2 = ((arguments != null && arguments.size() > 1) ? arguments.get(1) : null);
                if (MiPushClient.COMMAND_REGISTER.equals(command)) {
                        if (message.getResultCode() == ErrorCode.SUCCESS) {
                                mRegId = cmdArg1;
                        }
                }
        }
}
