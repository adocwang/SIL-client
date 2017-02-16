/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import "JPUSHService.h"
#import <UserNotifications/UserNotifications.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
@interface AppDelegate : UIResponder <JPUSHRegisterDelegate,UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic,strong)   RCTRootView *rootView;
@property (nonatomic, assign) BOOL fromBack;

@end
