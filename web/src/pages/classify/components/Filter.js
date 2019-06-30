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

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  handleReset = () => {
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

  render() {
    const { onAdd, filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    const { name } = filter
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} sm={{ span: 12 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Search
              placeholder={i18n.t`Search Name`}
              onSearch={this.handleSubmit}
            />,
          )}
        </Col>

        <Col type="flex" align="left" justify="space-between"
             {...TwoColProps}
             xl={{ span: 8 }}
             md={{ span: 8 }}
             sm={{ span: 8 }}
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
             xl={{ span: 8 }}
             md={{ span: 4 }}
             sm={{ span: 4 }}
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
