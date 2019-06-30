import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'

@connect(({ app, role, loading }) => ({
  role,
  loading,
}))
class Role extends PureComponent {
  render() {
    return (
      <Page >该功能正在开发中
      </Page>
    )
  }
}

Role.propTypes = {
  role: PropTypes.object,
  loading: PropTypes.object,
}

export default Role
