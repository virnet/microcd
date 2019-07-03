import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'

const { querySourceList, queryProjectList } = api

export default modelExtend(pageModel, {
  namespace: 'taskImport',
  state: {
    sourceList: [],
    projectList: [],
  },
  reducers: {
    querySuccess2(state, { payload }) {
      console.log('payload')
      console.log(payload)
      return { ...state, ...payload }
    },
  },
  effects: {
    *queryDataSource({ payload }, { call, put }) {
      const data = yield call(querySourceList, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess2',
          payload: {
            sourceList: data.data,
          },
        })
      } else {
        throw data
      }
    },
    *queryProject({ payload }, { call, put }) {
      const data = yield call(queryProjectList, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess2',
          payload: {
            projectList: data.data,
          },
        })
      } else {
        throw data
      }
    },
  },
})
