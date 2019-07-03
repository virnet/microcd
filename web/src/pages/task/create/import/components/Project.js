import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, message, Avatar, Spin } from 'antd'
import { withI18n } from '@lingui/react'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './Source.less'
import { Table, Button } from 'antd'

@withI18n()
class Project extends PureComponent {
  state = {
    loading: false,
    hasMore: true,
    selectedRowKeys: [],
  }
  handleInfiniteOnLoad = () => {
    return false
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  render() {
    let page = null
    const { projectList, handleSelectProject, step, i18n } = this.props

    const { loading, selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRowKeys.length > 0

    const columns = [
      {
        title: i18n.t`Display Name`,
        dataIndex: 'display_name',
      },
      {
        title: i18n.t`Name`,
        dataIndex: 'name',
      },
    ]

    if (step === 1) {
      const total = selectedRowKeys.length
      page = (
        <div hidden={step !== 1}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              {i18n.t`Select`}
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? i18n.t`Selected ${total} Items` : ''}
            </span>
          </div>
          <Table
            rowKey="name"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={projectList}
          />
        </div>
      )
    } else {
      page = <div hidden={step !== 1}>Loading</div>
    }
    return page
  }
}

Project.propTypes = {
  location: PropTypes.object,
}

export default Project
