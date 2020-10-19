const routes = [
  // @ts-ignore
  { path: '/', name: 'home', component: () => import('@/views/Home') },
  // @ts-ignore
  { path: '/about', name: 'about', component: () => import('@/views/About') }
];

export default routes;