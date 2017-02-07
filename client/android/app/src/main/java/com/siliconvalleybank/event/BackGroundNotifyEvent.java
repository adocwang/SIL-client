package com.siliconvalleybank.event;

import com.xiaomi.mipush.sdk.MiPushMessage;

/**
 * Created by kiefer on 2017/2/7.
 */

public class BackGroundNotifyEvent {
        private MiPushMessage miPushMessage;

        public BackGroundNotifyEvent(MiPushMessage miPushMessage) {
                this.miPushMessage = miPushMessage;
        }

        public MiPushMessage getMiPushMessage() {
                return miPushMessage;
        }

        public void setMiPushMessage(MiPushMessage miPushMessage) {
                this.miPushMessage = miPushMessage;
        }
}
