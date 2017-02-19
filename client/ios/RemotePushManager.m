//
//  RemotePushManager.m
//  SiliconValleyBank
//
//  Created by 张永 on 2017/2/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "RemotePushManager.h"
#import "JPUSHService.h"


@implementation RemotePushManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setPushAlias:(NSString *)phone)
{
  NSLog(@"%@",phone);
  [JPUSHService setAlias:phone callbackSelector:nil object:nil];
}

RCT_EXPORT_METHOD(clearPushAlias)
{
  [JPUSHService setAlias:@"" callbackSelector:nil object:nil];
}

RCT_EXPORT_METHOD(getPlatform:(RCTResponseSenderBlock)callback)
{
  NSArray *infos = @[@"ios"];
  callback(@[[NSNull null], infos]);
}

@end
