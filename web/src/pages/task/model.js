import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'

const { queryTaskList, queryTaskClassify } = api

export default modelExtend(pageModel, {
  namespace: 'task',
  state: {
    taskClassify: [], // 存放用户列表
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryTaskList, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
    *classify({ payload }, { call, put }) {
      const data = yield call(queryTaskClassify, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            taskClassify: data.data,
          },
        })
      } else {
        throw data
      }
    },
  },
})
