import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'

const { queryTaskList,queryTaskClassify } = api


export default modelExtend(pageModel, {
  namespace: 'post',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log("PATHNAME:"+location.pathname)
        if (pathMatchRegexp('/task', location.pathname)) {
          dispatch({
            type: 'query',
            payload: {
              status: 2,
              ...location.query,
              ...location.classify,
            },
          })
        }else if (pathMatchRegexp('/task', location.pathname)){
          dispatch({
            type: 'classify',
            payload: {
              status: 2,
              ...location.classify,
            },
          })
        }
      })
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
          type: 'querySuccess',
          payload: {
            list: data.data
          },
        })
      } else {
        throw data
      }
    },
  },
})
