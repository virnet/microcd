import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { router } from 'utils'
import { stringify } from 'qs'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'

const { TabPane } = Tabs


@withI18n()
@connect(({ post, loading }) => ({ post, loading }))
class Post extends PureComponent {
  render() {
    const { post, loading, location, i18n } = this.props
    const { list, pagination } = post
    const { query, pathname } = location

    const listProps = {
      pagination,
      dataSource: list,
      loading: loading.effects['task/query'],
      onChange(page) {
        router.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        })
      },
    }

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }
    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1,
        })
      },
      // onAdd() {
      //   dispatch({
      //     type: 'user/showModal',
      //     payload: {
      //       modalType: 'create',
      //     },
      //   })
      // },
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
      </Page>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Post
