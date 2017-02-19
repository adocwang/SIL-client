/**
 * Created by zhangyong on 2017/2/19.
 */
import {NativeModules} from 'react-native'
import {ToastShort} from "../utils/ToastUtils"

export var platformString = ""
const RemotePushManager = NativeModules.RemotePushManager

export function getPlatform() {
    RemotePushManager.getPlatform((error, infos) => {
        if (error) {
            console.error(error);
            ToastShort("获取平台失败")
        } else {
            platformString = infos[0]
        }
    })
}

export function setPushAlias(phone) {
    RemotePushManager.setPushAlias(phone)
}

export function clearAlias() {
    RemotePushManager.clearPushAlias("")

}
