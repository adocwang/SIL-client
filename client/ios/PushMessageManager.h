//
//  PushMessageManager.h
//  SiliconValleyBank
//
//  Created by 张永 on 2017/2/16.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>

@interface PushMessageManager : NSObject <RCTBridgeModule>


- (void)pushMessage:(NSDictionary *)userInfo;
@end
