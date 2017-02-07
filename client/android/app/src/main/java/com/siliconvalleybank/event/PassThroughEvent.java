package com.siliconvalleybank.event;

import com.xiaomi.mipush.sdk.MiPushMessage;

/**
 * Created by kiefer on 2017/2/7.
 */

public class PassThroughEvent {
        private MiPushMessage miPushMessage;

        public PassThroughEvent(MiPushMessage miPushMessage) {
                this.miPushMessage = miPushMessage;
        }

        public MiPushMessage getMiPushMessage() {
                return miPushMessage;
        }

        public void setMiPushMessage(MiPushMessage miPushMessage) {
                this.miPushMessage = miPushMessage;
        }
}
