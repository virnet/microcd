export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryTaskList: '/tasks',
  queryTaskClassify: '/tasks/classify',
  queryProjectList: '/outside/project',
  querySourceList: '/outside/source',

  queryDashboard: '/dashboard',

  queryClassifyList: '/classifies',
  updateClassify: 'Patch /classify/:id',
  createClassify: 'POST /classify',
  removeClassify: 'DELETE /classify/:id',
  removeClassifyList: 'POST /classifies/delete',
}
