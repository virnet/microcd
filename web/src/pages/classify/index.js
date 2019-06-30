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
@connect(({ classify, loading }) => ({ classify, loading }))
class Classify extends PureComponent {
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
      type: 'classify/query',
      payload,
    })
    router.push({
      pathname,
      search: stringify(payload, { arrayFormat: 'repeat' }),
    })
  }
  render() {
    const { classify, loading, location, i18n,dispatch } = this.props
    const { list, pagination } = classify
    const { query } = location
    const listProps = {
      dataSource: list,
      loading: loading.effects['classify/query'],
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
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
          page: 1,
        })
      },
      // onAdd() {
      //   dispatch({
      //     type: 'classify/showModal',
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

Classify.propTypes = {
  classify: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Classify
