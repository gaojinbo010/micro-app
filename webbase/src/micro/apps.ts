export const apps = [
    {
        name: 'ng-sub',
        entry: '//localhost:4501',
        container: '#sub-root',
        activeRule: '/ng-sub',
        props: {}
    },
    {
        name: 'vue-sub',
        entry: '//localhost:4502',
        container: '#sub-root',
        activeRule: '/vue-sub',
        props: {
            name:'vue-sup-app name'
        }
    },
    {
        name: 'react-sub',
        entry: '//localhost:4503',
        container: '#sub-root',
        activeRule: '/react-sub',
        props: {}
    }
];