import { Constant } from './_utils'

const { ApiPrefix } = Constant

const database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    i18n: {
      zh: {
        name: '仪表盘',
      },
      'pt-br': {
        name: 'Dashboard',
      },
    },
    route: '/dashboard',
  },
  {
    id: '2',
    breadcrumbParentId: '1',
    name: 'Tasks',
    i18n: {
      zh: {
        name: '任务',
      },
      'pt-br': {
        name: 'Tasks',
      },
    },
    icon: 'shopping-cart',
    route: '/task',
  },
  {
    id: '3',
    breadcrumbParentId: '1',
    name: 'User',
    i18n: {
      zh: {
        name: '用户',
      },
      'pt-br': {
        name: 'Usuário',
      },
    },
    icon: 'user',
  },
  {
    id: '31',
    menuParentId: '3',
    name: 'User Manager',
    i18n: {
      zh: {
        name: '用户管理',
      },
      'pt-br': {
        name: 'Usuário',
      },
    },
    icon: 'user',
    route: '/user',
  },
  {
    id: '32',
    menuParentId: '3',
    name: 'Privileges',
    i18n: {
      zh: {
        name: '权限管理',
      },
      'pt-br': {
        name: 'Privileges',
      },
    },
    icon: 'user',
    route: '/user',
  },
  {
    id: '33',
    menuParentId: '3',
    name: 'Role',
    i18n: {
      zh: {
        name: '角色管理',
      },
      'pt-br': {
        name: 'Role',
      },
    },
    icon: 'user',
    route: '/user',
  },
  {
    id: '4',
    breadcrumbParentId: '1',
    name: 'Request',
    i18n: {
      zh: {
        name: 'Request',
      },
      'pt-br': {
        name: 'Requisição',
      },
    },
    icon: 'api',
    route: '/request',
  },
  {
    id: '5',
    breadcrumbParentId: '1',
    name: 'UI Element',
    i18n: {
      zh: {
        name: 'UI组件',
      },
      'pt-br': {
        name: 'Elementos UI',
      },
    },
    icon: 'camera-o',
  },
  {
    id: '51',
    breadcrumbParentId: '5',
    menuParentId: '4',
    name: 'Editor',
    i18n: {
      zh: {
        name: 'Editor',
      },
      'pt-br': {
        name: 'Editor',
      },
    },
    icon: 'edit',
    route: '/UIElement/editor',
  },
  {
    id: '6',
    breadcrumbParentId: '1',
    name: 'Charts',
    i18n: {
      zh: {
        name: 'Charts',
      },
      'pt-br': {
        name: 'Graficos',
      },
    },
    icon: 'code-o',
  },
  {
    id: '61',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'ECharts',
    i18n: {
      zh: {
        name: 'ECharts',
      },
      'pt-br': {
        name: 'ECharts',
      },
    },
    icon: 'line-chart',
    route: '/chart/ECharts',
  },
  {
    id: '62',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'HighCharts',
    i18n: {
      zh: {
        name: 'HighCharts',
      },
      'pt-br': {
        name: 'HighCharts',
      },
    },
    icon: 'bar-chart',
    route: '/chart/highCharts',
  },
  {
    id: '63',
    breadcrumbParentId: '5',
    menuParentId: '5',
    name: 'Rechartst',
    i18n: {
      zh: {
        name: 'Rechartst',
      },
      'pt-br': {
        name: 'Rechartst',
      },
    },
    icon: 'area-chart',
    route: '/chart/Recharts',
  },
]
for (var k in database) {
    console.log(database[k])
    database[k]["i18n"] = JSON.stringify(database[k]["i18n"])
    console.log(database[k])
}
module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
