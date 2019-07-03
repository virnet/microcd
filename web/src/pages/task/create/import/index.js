import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import ImportSteps from './components/ImportSteps'
import Source from './components/Source'
import Project from './components/Project'
import { Divider } from 'antd'

@withI18n()
@connect(({ taskImport, loading }) => ({ taskImport, loading }))
class TaskImport extends PureComponent {
  state = {
    step: 0,
  }

  componentDidMount() {
    this.loadingSource({})
  }

  loadingSource = newQuery => {
    const { dispatch } = this.props
    const payload = {
      ...newQuery,
    }
    dispatch({
      type: 'taskImport/queryDataSource',
      payload,
    })
  }
  loadingProject = newQuery => {
    const { dispatch } = this.props
    const payload = {
      ...newQuery,
    }
    dispatch({
      type: 'taskImport/queryProject',
      payload,
    })
  }

  render() {
    const { step } = this.state
    const { taskImport, i18n, dispatch } = this.props
    const { sourceList, projectList, pagination } = taskImport
    const sourceProps = {
      sourceList: sourceList,
      step: step,
      handleSelect: (select, link) => {
        this.setState({ step: 1 })
        this.loadingProject()
      },
    }

    const projectProps = {
      sourceList: sourceList,
      projectList: projectList,
      pagination: pagination,
      step: step,
      onLoadMore: newQuery => {
        this.loadingProject()
      },
      handleSelect: (select, link) => {
        this.setState({ step: 1 })
        this.loadingProject()
      },
    }
    const stepsProps = {
      step: step,
    }

    return (
      <Page inner>
        <ImportSteps {...stepsProps} />
        <Divider />
        <Source {...sourceProps} />
        <Project {...projectProps} />
      </Page>
    )
  }
}

TaskImport.propTypes = {
  taskImport: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default TaskImport
