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
    path: '/register',
    component: () => import('@/views/register/index'),
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
    redirect: '/dashboardManage',
    meta: { title: ' 图书系统界面', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'dashboardManage',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主页', icon: 'dashboard' },
      },
      {
        path: 'appleBookManage',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/bookManage/index'),
        meta: { title: '纸质图书审批管理', icon: 'dashboard' },
      },
      {
        path: 'addAppleBooke',
        name: 'AddAppleBooke',
        component: () => import('@/views/dashboard/bookManage/addBook'),
        show: false,
      },
      {
        path: 'updateAppleBooke',
        name: 'UpdateAppleBooke',
        component: () => import('@/views/dashboard/bookManage/updateBook'),
        show: false,
      },
      {
        path: 'showBookDetail',
        name: 'ShowBookDetail',
        component: () => import('@/views/dashboard/showBookDetail'),
        show: false,
      },
      {
        path: 'showEBookDetail',
        name: 'ShowEBookDetail',
        component: () => import('@/views/dashboard/showEBookDetail'),
        show: false,
      },
      {
        path: 'showReadBookHis',
        name: 'ShowReadBookHis',
        component: () => import('@/views/dashboard/showReadBookHis'),
        show: false,
      },
      {
        path: 'showBorrowBookHis',
        name: 'ShowBorrowBookHis',
        component: () => import('@/views/dashboard/showBorrowBookHis'),
        show: false,
      },
    ],
  },

  {
    path: '/ebook',
    component: Layout,
    redirect: '/ebook/ebookManage',
    name: 'ebook',
    meta: { title: ' 电子图书管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'ebookManage',
        name: 'EBookManage',
        component: () => import('@/views/ebookManage/index'),
        meta: { title: '电子图书信息', icon: 'table' },
      },
      {
        path: 'addEBook',
        name: 'AddEBook',
        component: () => import('@/views/ebookManage/addEBook'),
        meta: { title: '添加电子图书信息', icon: 'table' },
      },
      {
        path: 'readEBookHis',
        name: 'ReadEBookHis',
        component: () => import('@/views/ebookManage/readEBookHis'),
        meta: { title: '用户阅读图书记录', icon: 'table' },
      },
      {
        path: 'updateEBook',
        name: 'UpdateEBook',
        component: () => import('@/views/ebookManage/updateEBook'),
        show: false,
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
      {
        path: 'borrowBookHis',
        name: 'BorrowBookHis',
        component: () => import('@/views/bookManage/borrowBookHis'),
        meta: { title: '用户借阅图书记录', icon: 'table' },
      },
    ],
  },

  {
    path: '/category',
    component: Layout,
    redirect: '/category/categoryManage',
    name: 'category',
    meta: { title: ' 图书分类管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'categoryManage',
        name: 'CategoryManage',
        component: () => import('@/views/category/index'),
        meta: { title: '图书分类信息', icon: 'table' },
      },
      {
        path: 'addCategory',
        name: 'AddCategory',
        component: () => import('@/views/category/addCategory'),
        meta: { title: '添加图书分类信息', icon: 'table' },
      },
      {
        path: 'updateCategory',
        name: 'UpdateCategory',
        component: () => import('@/views/category/updateCategory'),
        show: false,
      },
    ],
  },

  {
    path: '/bookmanager',
    component: Layout,
    redirect: '/bookmanager/bookManagerManage',
    name: 'Bookmanager',
    meta: { title: ' 图书管理员管理', icon: 'el-icon-s-help' },
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
        meta: { title: '添加读者', icon: 'table' },
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
    path: '/apple',
    component: Layout,
    redirect: '/apple/appleBook',
    name: 'apple',
    meta: { title: '审批读者捐赠书籍', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'appleBook',
        name: 'AppleBook',
        component: () => import('@/views/apple/appleBook'),
        meta: { title: '纸质书籍审批', icon: 'table' },
      },
      {
        path: 'appleEBook',
        name: 'appleEBook',
        component: () => import('@/views/apple/appleEBook'),
        meta: { title: '电子书籍审批', icon: 'table' },
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
