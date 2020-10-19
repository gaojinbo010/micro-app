import App from './App.vue';
import { createApp } from 'vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// for angular subapp
import 'zone.js/dist/zone';

// antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import {
    registerMicroApps,      // 注册子应用方法
    setDefaultMountApp,     // 设默认启用的子应用
    runAfterFirstMounted,   // 有个子应用加载完毕回调
    start,                  // 启动
    addGlobalUncaughtErrorHandler,
    FrameworkConfiguration,
    FrameworkLifeCycles,    // 添加全局未捕获异常处理器
    initGlobalState,        // 官方应用间通信
} from "qiankun";
import { apps, lifeCycles } from './micro';

// 主应用
let instance: any;

const loader = (loading: boolean) => render({ loading });

const render = (props: any) => {
    const { appContent, loading } = props;
    if (!instance) {
        instance = createApp(App);
        instance.use(Antd);
        instance.use(store);
        instance.use(router);
        instance.mount('#app');
    } else {
        instance.content = appContent;
        instance.loading = loading;
    }

}

// 全局变量
const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'admin',
    token: 'app-token'
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
    user: 'admin',
    token: 'app-token'
});

// 主应用渲染
render({ loading: true });


// 注册子应用
// @ts-ignore
const microApps = apps.map(app => {
    return {
        loader,
        ...app
    }
});
// @ts-ignore
registerMicroApps(microApps, lifeCycles);

// 设置默认子应用
// setDefaultMountApp(defaultApp);

// 启动微服务
const opts: FrameworkConfiguration = { prefetch: false };
start(opts);

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
});

// 设置全局未捕获一场处理器
addGlobalUncaughtErrorHandler(event => console.log(event));
