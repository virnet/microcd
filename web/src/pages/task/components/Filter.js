/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const { Option } = Select
const { Search } = Input

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@withI18n()
@Form.create()
class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingClassify: false,
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (Object.keys(prevProps.filter).length === 0) {
  //     this.handleReset()
  //   }
  // }

  handleSubmit = () => {
    console.log("提交过滤器")
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  handleReset = () => {
    console.log("重置过滤器")
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }
  handleClassifyChange = (key, values) => {
    console.log(key + ':' + values)
  }
  handleClassifySearch = (key, values) => {
    console.log(key + ':' + values)
  }

  render() {
    const { onAdd, filter, form, i18n, onLoadingClassify, taskClassify } = this.props
    const { isLoadingClassify } = this.state
    const { getFieldDecorator } = form
    const { name, classify } = filter
    if (!isLoadingClassify) {
      this.setState({ isLoadingClassify: true })
      onLoadingClassify()
      console.log('加载分类')
    }
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 12 }} sm={{ span: 12 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Search
              placeholder={i18n.t`Search Name`}
              onSearch={this.handleSubmit}
            />,
          )}
        </Col>

        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 12 }} sm={{ span: 12 }}>
          {getFieldDecorator('classify', { initialValue: classify })(
            <Select style={{ width: '100%' }}
                    showSearch
                    onChange={this.handleClassifyChange}
                    placeholder="Select Classify"
                    onSearch={this.handleClassifySearch}
            >
              {
                taskClassify.length && taskClassify.map((item) => (

                  <Option key={item.name}>{item.display_name}</Option>),
                )
              }
            </Select>,
          )}
        </Col>
        <Col type="flex" align="left" justify="space-between"
             {...TwoColProps}
             xl={{ span: 8 }}
             md={{ span: 12 }}
             sm={{ span: 12 }}
        >
          <Button
            type="primary"
            className="margin-right"
            onClick={this.handleSubmit}
          >
            <Trans>Search</Trans>
          </Button>
          <Button onClick={this.handleReset}>
            <Trans>Reset</Trans>
          </Button>

        </Col>
        <Col type="flex" align="right" justify="space-between"
             {...TwoColProps}
             xl={{ span: 4 }}
             md={{ span: 12 }}
             sm={{ span: 12 }}
        >
          <Button type="ghost" onClick={onAdd}>
            <Trans>Create</Trans>
          </Button>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onLoadingClassify: PropTypes.func,
}

export default Filter
