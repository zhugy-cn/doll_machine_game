
export default [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
  },
  {
    path: '/home/:machine_id?',
    name: 'home',
    component: () => import(
      /* webpackChunkName: "Home" */
      '_views/Home/Home.vue'
    )
  }
]