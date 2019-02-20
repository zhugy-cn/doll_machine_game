
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(
      /* webpackChunkName: "Home" */
      '_views/Home/Home.vue'
    )
  }
]