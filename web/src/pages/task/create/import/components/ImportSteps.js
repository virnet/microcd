import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Steps } from 'antd'
import { withI18n } from '@lingui/react'

const { Step } = Steps

@withI18n()
class ImportSteps extends PureComponent {
  render() {
    const { step, i18n } = this.props
    console.log(this.props)
    return (
      <Steps current={step}>
        <Step title={i18n.t`Select Data Source`} />
        <Step title={i18n.t`Select Project`} />
        <Step title={i18n.t`Configure`} />
      </Steps>
    )
  }
}

ImportSteps.propTypes = {
  location: PropTypes.object,
}

export default ImportSteps
