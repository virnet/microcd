/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Form, Button, Row, Col, Input ,Select } from 'antd'

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

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(prevProps.filter).length === 0) {
      this.handleReset()
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
  handleClassifyChange = (key, values) => {
    console.log(key+":"+values);
  }
  handleClassifySearch = (key, values) => {
    console.log(key+":"+values);
  }

  render() {
    const { onAdd, filter, form, i18n } = this.props
    const { dataSource } = this.props;
    const { getFieldDecorator } = form
    const { name, classify } = filter
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Search
              placeholder={i18n.t`Search Name`}
              onSearch={this.handleSubmit}
            />
          )}
        </Col>

        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('classify', { initialValue: classify })(
            <Select style={{ width: 200 }}
                    showSearch
                    onChange={this.handleClassifyChange}
                    placeholder="Select Classify"
                    onSearch={this.handleClassifySearch}
            >
              {
                dataSource.length && dataSource.map( (item, index) => (
                  <Select.Option key={index} value={item}>{item}</Select.Option>)
                )
              }
            </Select>
          )}
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 12 }}
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
}

export default Filter
