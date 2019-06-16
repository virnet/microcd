import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './task.less'

const status = {
  1: {
    color: Color.green,
    text: '开发(部署中)',
  },
  2: {
    color: Color.yellow,
    text: '开发(部署完成)',
  },
  3: {
    color: Color.red,
    text: '提测',
  },
  4: {
    color: Color.yellow,
    text: '测试(部署中)',
  },
  5: {
    color: Color.blue,
    text: '测试(部署完成)',
  },
  6: {
    color: Color.blue,
    text: '终止',
  },
  7: {
    color: Color.blue,
    text: '测试(部署中)',
  },
}

function Task({ data }) {
  const columns = [
    {
      title: '项目',
      dataIndex: 'project',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
  ]
  return (
    <div className={styles.task}>
      <Table
        pagination={false}
        columns={columns}
        rowKey={(record, key) => key}
        dataSource={data.filter((item, key) => key < 5)}
      />
    </div>
  )
}

Task.propTypes = {
  data: PropTypes.array,
}

export default Task
