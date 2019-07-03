import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List, message, Avatar, Spin } from 'antd'
import { withI18n } from '@lingui/react'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './Source.less'

@withI18n()
class Source extends PureComponent {
  render() {
    let page = null
    const { sourceList, handleSelect, step, i18n } = this.props
    if (step === 0) {
      page = (
        <div hidden={step !== 0}>
          <InfiniteScroll initialLoad={false} useWindow={false}>
            <List
              dataSource={sourceList}
              renderItem={item => (
                <List.Item
                  key={item.name}
                  onClick={handleSelect}
                  className={styles.source}
                  id={item.name}
                >
                  <List.Item.Meta
                    title={item.display_name}
                    description={item.name}
                  />
                </List.Item>
              )}
            ></List>
          </InfiniteScroll>
        </div>
      )
    } else if (step === 1) {
      page = <div hidden={step !== 0}>Loading</div>
    }
    return page
  }
}

Source.propTypes = {
  location: PropTypes.object,
}

export default Source
