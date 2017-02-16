//
//  NotiEventEmitter.h
//  SiliconValleyBank
//
//  Created by 张永 on 2017/2/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <React/RCTEventEmitter.h>

@interface NotiEventEmitter : RCTEventEmitter

- (void)notiSend:(NSString *)info;
- (void)alter:(NSString *)st;
@end
