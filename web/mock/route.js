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
    name: 'Users',
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
    id: '7',
    breadcrumbParentId: '1',
    name: 'Posts',
    i18n: {
      zh: {
        name: '用户管理',
      },
      'pt-br': {
        name: 'Posts',
      },
    },
    icon: 'shopping-cart',
    route: '/post',
  },
  {
    id: '21',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    name: 'User Detail',
    i18n: {
      zh: {
        name: '用户详情',
      },
      'pt-br': {
        name: 'Detalhes do usuário',
      },
    },
    route: '/user/:id',
  },
  {
    id: '3',
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
    id: '4',
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
    id: '45',
    breadcrumbParentId: '4',
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
    id: '5',
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
    id: '51',
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
    id: '52',
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
    id: '53',
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
