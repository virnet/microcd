import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'

@connect(({ app, privileges, loading }) => ({
  privileges,
  loading,
}))
class Privileges extends PureComponent {
  render() {
    return (
      <Page >该功能正在开发中
      </Page>
    )
  }
}

Privileges.propTypes = {
  privileges: PropTypes.object,
  loading: PropTypes.object,
}

export default Privileges
