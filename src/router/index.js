import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectsView.vue')
  },
  {
    path: '/project/:slug',
    name: 'project',
    component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectView.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "md" */ '../views/login/LoginView.vue')
  },

  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "md" */ '../views/admin/AdminView.vue'),
    children: [
      {
        path: 'home',
        name: 'admin-home',
        component: () => import(/* webpackChunkName: "md" */ '../views/admin/AdminMain.vue')
      },
      {
        path: 'page',
        name: 'admin-page',
        component: () => import(/* webpackChunkName: "admin-page" */ '../views/admin/PageList.vue')
      },
      {
        path: 'page/:page_name/edit',
        name: 'admin-page-edit',
        component: () => import(/* webpackChunkName: "admin-page" */ '../views/admin/PageEdit.vue'),
        props: true
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import(/* webpackChunkName: "admin-page" */ '../views/admin/dashboard/DashBoardView.vue')
      },
      {
        path: 'dashboard/:page_name/',
        name: 'admin-dashboard-page',
        component: () => import(/* webpackChunkName: "admin-dashboard-page" */ '../views/admin/dashboard/PageAnalyticsView.vue'),
        props: true
      },
      {
        path: 'projects',
        name: 'admin-projects',
        component: () => import(/* webpackChunkName: "admin-projects" */ '../views/admin/project/ProjectListView.vue')
      },
      {
        path: 'project/:slug',
        name: 'admin-project',
        component: () => import(/* webpackChunkName: "project-edit" */ '../views/admin/project/ProjectEditView.vue'),
        props: true
      },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
