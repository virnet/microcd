import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'


@withI18n()
@connect(({ task, loading }) => ({ task, loading }))
class Task extends PureComponent {
  componentDidMount() {
    this.handleRefresh({ page: 1, pageSize: 10 })
  }

  handleRefresh = newQuery => {
    const { location, dispatch } = this.props
    const { query, pathname } = location
    const payload = {
      ...query,
      ...newQuery,
    }
    dispatch({
      type: 'task/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }
  render() {
    const { task, loading, location, i18n,dispatch } = this.props
    const { list, pagination } = task
    const { taskClassify } = task
    const { query, pathname } = location
    const listProps = {
      dataSource: list,
      loading: loading.effects['task/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      // onChange(page) {
      //   router.push({
      //     pathname,
      //     search: stringify({
      //       ...query,
      //       page: page.current,
      //       pageSize: page.pageSize,
      //     }),
      //   })
      // },
    }

    const filterProps = {
      taskClassify: taskClassify,
      filter: {
        ...query,
      },
      onLoadingClassify(){
        dispatch({
          type: 'task/classify',
          payload: {
          },
        }).then(()=> {
          const { taskClassify } = task
          console.log(taskClassify)
        })
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
          page: 1,
        })
      },
      // onAdd() {
      //   dispatch({
      //     type: 'task/showModal',
      //     payload: {
      //       modalType: 'create',
      //     },
      //   })
      // },
    };

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
      </Page>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Task
