const routes = [
  { path: '/', redirect: '/basic/chapter1-3' },
  {
    path: '/basic',
    icon: 'BulbOutlined',
    name: '基础篇',
    routes: [
      {
        path: '/basic/chapter1-3',
        component: '@/pages/chapter1-3',
        name: '基础篇一至三',
      },
      {
        path: '/basic/chapter1',
        component: '@/pages/chapter4',
        name: '基础篇-玄学State',
      },
      {
        path: '/basic/chapter5',
        component: '@/pages/chapter5',
        name: '基础篇-深入prop',
      },
      {
        path: '/basic/chapter6',
        component: '@/pages/chapter6',
        name: '基础篇-理解lifeCycle',
      },
      {
        path: '/basic/chapter7',
        component: '@/pages/chapter7',
        name: '基础篇-多功能ref',
      },
      {
        path: '/basic/chapter8',
        component: '@/pages/chapter8',
        name: '基础篇-提供者context',
      },
      {
        path: '/basic/chapter9',
        component: '@/pages/chapter9',
        name: '基础篇-模块化css',
      },
      {
        path: '/basic/chapter10',
        component: '@/pages/chapter10',
        name: '基础篇-高阶组件',
      },
    ],
  },
  {
    path: '/optimize',
    icon: 'BulbOutlined',
    name: '优化篇',
    routes: [
      {
        path: '/optimize/chapter11',
        component: '@/pages/chapter11',
        name: '渲染控制',
      },
      {
        path: '/optimize/chapter12',
        component: '@/pages/chapter12',
        name: '渲染调优',
      },
    ],
  },
];
export default routes;
