import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import PortfolioView from "@/views/PortfolioView.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: '',
    name: 'portfolio',
    component: PortfolioView,
    children:[
      {
        path: '',
        name: 'home',
        component: HomeView,
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
        path: '/resume',
        name: 'resume',
        component: () => import(/* webpackChunkName: "projects" */ '../views/ResumeView.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import(/* webpackChunkName: "projects" */ '../views/ContactView.vue'),
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectsView.vue'),
       },
      {
        path: '/project/:slug',
        name: 'project',
        component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectView.vue'),
        props: true
      },
      {
        path: '/blog',
        name: 'blog',
        component: () => import(/* webpackChunkName: "auth" */ '../views/blog/BlogView.vue'),
        children: [
          {
            path: '',
            name: 'blog-list',
            component: () => import(/* webpackChunkName: "login" */ '../views/blog/BlogsListView.vue')
          },      {
            path: ':slug',
            name: 'blog-content',
            component: () => import(/* webpackChunkName: "register" */ '../views/blog/BlogContentView.vue'),
            props: true
          }
        ]
      },
      {
        path: '/game',
        name: 'game',
        component: () => import(/* webpackChunkName: "games" */ '../views/game/GameView.vue'),
        children: [
          {
            path: '',
            name: 'games',
            component: () => import(/* webpackChunkName: "game" */ '../views/game/GameListView.vue'),
          },
          {
            path: ':slug',
            name: 'game-video',
            component: () => import(/* webpackChunkName: "game" */ '../views/game/GameVideoView.vue'),
            props: true
          }
        ]
      },
      {
        path: '/auth',
        name: 'auth',
        component: () => import(/* webpackChunkName: "auth" */ '../views/login/AuthView.vue'),
        children: [
          {
            path: 'login',
            name: 'login',
            component: () => import(/* webpackChunkName: "login" */ '../views/login/LoginView.vue')
          },      {
            path: 'register',
            name: 'register',
            component: () => import(/* webpackChunkName: "register" */ '../views/login/RegisterView.vue')
          }
        ]
      },
    ]
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
      {
        path: 'tags',
        name: 'admin-tag-manage',
        component: () => import(/* webpackChunkName: "project-edit" */ '../views/admin/tag/TagEditView.vue'),
      },
      {
        path: 'resume-edit',
        name: 'resume-edit',
        component: () => import(/* webpackChunkName: "project-edit" */ '../views/admin/resume/ResumeEdit.vue'),
      },
      {
        path: 'todos',
        name: 'todos',
        component: () => import(/* webpackChunkName: "project-edit" */ '../views/admin/todo/AdvanceTodoView.vue'),
      },
      {
        path: 'otp',
        name: 'otp',
        component: () => import(/* webpackChunkName: "project-edit" */ '../views/admin/otp/OtpManager.vue'),
      },{
        path: 'userflow',
        name: 'user-flow',
        component: () => import(/* webpackChunkName: "userflow" */ '../views/admin/userflow/UserFlowView.vue'),
      }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
})

export default router
