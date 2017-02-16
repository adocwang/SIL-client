//
//  PushMessageManager.m
//  SiliconValleyBank
//
//  Created by 张永 on 2017/2/16.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "PushMessageManager.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>
@implementation PushMessageManager

@synthesize bridge = _bridge;

- (void)pushMessage:(NSDictionary *)userInfo
{
  NSLog(@"发送消息");
  RCTEventDispatcher *dispatcher = self.bridge.eventDispatcher;
  NSLog(dispatcher);
  NSLog(self.bridge);
  NSLog(@"%@", dispatcher.description);
//  [self.bridge.eventDispatcher sendAppEventWithName:@"MiPushMessage"
//                                               body:@{@"params": userInfo,@"type":@"1"}];
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"MiPushMessage"                                                body:@{@"params": userInfo,@"type":@"2"}];
}

@end
