/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"




@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
    

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SiliconValleyBank"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.rootView = rootView;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //iOS8 - iOS10

  [application registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert | UIUserNotificationTypeSound | UIUserNotificationTypeBadge categories:nil]];
  
  //iOS10
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionBadge | UNAuthorizationOptionSound) completionHandler:^(BOOL granted, NSError * _Nullable error) {
    
  }];
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  
  [self configureJPush];
  
  // 处理点击通知打开app的逻辑
  NSDictionary* userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
  if(userInfo){//推送信息
    NSLog(@"收到推送消息");

  }
  
  [JPUSHService setupWithOption:launchOptions appKey:@"dd19b8ba0c66d03e1ccc23cb" channel:@"App store" apsForProduction:false];
  self.fromBack = YES;
  [self performSelector:@selector(backStatusSet) withObject:nil afterDelay:5];

  return YES;
}

- (void)tryPushMessage:(NSString *)type data:(NSDictionary *)data {
  [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
   [self.rootView.bridge.eventDispatcher sendDeviceEventWithName:@"MiPushMessage"                                                body:@{@"content": data,@"type":type}];
}

- (void)showAlert:(NSString *)index {
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"..." message:index delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
  [alert show];
}

//配置极光推送
- (void)configureJPush {
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound;
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {

  }
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  self.fromBack = YES;
}

- (void)backStatusSet {
  self.fromBack = NO;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
  NSLog(@"注册apns成功");
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  //注册apns失败
  NSLog(@"注册apns失败");
}



- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  [self showAlert:@"2"];

  completionHandler();
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  // Required
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [self tryPushMessage:@"1" data:userInfo];

  }
  completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  // Required
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    if(self.fromBack) {
      [self tryPushMessage:@"3" data:userInfo];
    } else {
      [self tryPushMessage:@"2" data:userInfo];

    }
    self.fromBack = NO;
  }

  completionHandler();  // 系统要求执行这个方法
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  
  // Required, iOS 7 Support
  [JPUSHService handleRemoteNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  
  NSLog(@"接受到消息6");

  [JPUSHService handleRemoteNotification:userInfo];
}

@end
