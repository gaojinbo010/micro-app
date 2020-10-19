import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './registerServiceWorker'
import routes from './router'
import store from './store'
import './public-path';


let router = null;
let instance: any = null;


const render = (props = {}) => {
    const { container } = props as any;
    router = createRouter({
        history: createWebHistory((<any>window).__POWERED_BY_QIANKUN__ ? '/vue-sub' : '/'),
        routes: (<any>routes),
    });
    instance = createApp(App);
    instance.use(router);
    instance.use(store);
    instance.mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行
if (!(<any>window).__POWERED_BY_QIANKUN__) {
    render();
}

const globalStore = (props: any) => {
    props.onGlobalStateChange &&
        props.onGlobalStateChange(
            (value: any, prev: any) => {

                console.log('vue-sub : --- --- ---')
                console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev);
            },
            true,
        );
    props.setGlobalState &&
        props.setGlobalState({
            user:'tester',
            token:'edit-token'
        });
}


export async function bootstrap() {
    console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

export async function mount(props: any) {
    globalStore(props);
    render(props);
}

export async function unmount() {
    instance.unmount();
    instance._container.innerHTML = '';
    instance = null;
    router = null;
}
