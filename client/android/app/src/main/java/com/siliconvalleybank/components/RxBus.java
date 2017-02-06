package com.siliconvalleybank.components;

import android.util.Log;
import rx.Observable;
import rx.Subscriber;
import rx.subjects.PublishSubject;
import rx.subjects.SerializedSubject;
import rx.subjects.Subject;

/**
 * Created by kiefer on 15/12/14.
 */
public class RxBus {

        private static volatile RxBus mDefaultInstance;
        private static final String TAG = "RxBus";

        private RxBus() {
        }

        public static RxBus getDefault() {
                if (mDefaultInstance == null) {
                        synchronized (RxBus.class) {
                                if (mDefaultInstance == null) {
                                        mDefaultInstance = new RxBus();
                                }
                        }
                }
                return mDefaultInstance;
        }

        private final Subject<Object, Object> _bus = new SerializedSubject<>(PublishSubject.create());

        public void send(Object o) {
                _bus.onNext(o);
        }

        public Observable<Object> toObservable() {
                return _bus;
        }

        /**
         * 返回特定类型的被观察者
         *
         * @param eventType
         * @param <T>
         * @return
         */
        public <T> Observable<T> toObservable(Class<T> eventType) {
                return _bus.ofType(eventType);
        }

        /**
         * A simple logger for RxBus which can also prevent
         * potential crash(OnErrorNotImplementedException) caused by error in the workflow.
         */
        public static Subscriber<Object> defaultSubscriber() {
                return new Subscriber<Object>() {
                        @Override
                        public void onCompleted() {
                                Log.d(TAG, "Duty off!!!");
                        }

                        @Override
                        public void onError(Throwable e) {
                                Log.e(TAG, "What is this? Please solve this as soon as possible!", e);
                        }

                        @Override
                        public void onNext(Object o) {
                                Log.d(TAG, "New event received: " + o);
                        }
                };
        }
}
