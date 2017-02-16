//
//  NotiEventEmitter.m
//  SiliconValleyBank
//
//  Created by 张永 on 2017/2/15.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NotiEventEmitter.h"
#import <React/RCTBridge.h>


@implementation NotiEventEmitter
RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (NSArray<NSString *> *)supportedEvents {
  return @[@"sendName"]; //这里返回的将是你要发送的消息名的数组。
}

- (void)notiSend:(NSString *)info {
  [self sendEventWithName:@"notiSend" body:info];
}

- (void)alter:(NSString *)st {
  UIAlertController *alter = [UIAlertController alertControllerWithTitle:@"测试" message:st preferredStyle:UIAlertControllerStyleAlert];
  
  [alter addAction:[UIAlertAction actionWithTitle:@"了解" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
    //iOS发送通知给js
    [self sendEventWithName:@"sendName" body:@{@"name":@"江山",@"age":@"5000"}];
  }]];
  [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alter animated:YES completion:nil];
}

@end
