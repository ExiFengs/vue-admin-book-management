import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/bookManage',
    name: 'book',
    meta: { title: ' 纸质图书管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'bookManage',
        name: 'BookManage',
        component: () => import('@/views/bookManage/index'),
        meta: { title: '纸质图书信息', icon: 'table' },
      },
      {
        path: 'addBook',
        name: 'AddBook',
        component: () => import('@/views/bookManage/addBook'),
        meta: { title: '添加纸质图书信息', icon: 'table' },
      },
      {
        path: 'updateBook',
        name: 'UpdateBook',
        component: () => import('@/views/bookManage/updateBook'),
        show: false,
      },
    ],
  },

  {
    path: '/bookmanager',
    component: Layout,
    redirect: '/bookmanager/bookManagerManage',
    name: 'Bookmanager',
    meta: { title: '图书管理员管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'readerManage',
        name: 'Table',
        component: () => import('@/views/bookManagerManage/index'),
        meta: { title: '图书管理员信息', icon: 'table' },
      },
      {
        path: 'addBookManager',
        name: 'AddBookManager',
        component: () => import('@/views/bookManagerManage/addBookManager'),
        meta: { title: '添加图书管理员', icon: 'table' },
      },
      {
        path: 'updateBookManager',
        name: 'UpdateBookManager',
        component: () => import('@/views/bookManagerManage/updateBookManager'),
        show: false,
      },
    ],
  },
  {
    path: '/ad',
    component: Layout,
    redirect: '/ad/adManage',
    name: 'Ad',
    meta: { title: ' 广告栏管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'adManage',
        name: 'AdManage',
        component: () => import('@/views/adManage/index'),
        meta: { title: '广告栏信息', icon: 'table' },
      },
      {
        path: 'addAd',
        name: 'AddAd',
        component: () => import('@/views/adManage/addAd'),
        meta: { title: '添加广告栏', icon: 'table' },
      },
      {
        path: 'updateAd',
        name: 'UpdateAd',
        component: () => import('@/views/adManage/updateAd'),
        show: false,
      },
    ],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/readerManage',
    name: 'Example',
    meta: { title: '读者管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'readerManage',
        name: 'Table',
        component: () => import('@/views/readerManage/index'),
        meta: { title: '读者信息', icon: 'table' },
      },
      {
        path: 'addReader',
        name: 'AddReader',
        component: () => import('@/views/readerManage/addReader'),
        meta: { title: ' 添加读者', icon: 'table' },
      },
      {
        path: 'updateReader',
        name: 'UpdateReader',
        component: () => import('@/views/readerManage/updateReader'),
        show: false,
      },
    ],
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' },
      },
    ],
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested',
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' },
      },
    ],
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
