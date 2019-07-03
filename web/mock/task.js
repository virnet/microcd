import { Mock, Constant } from './_utils'

const { ApiPrefix } = Constant

let postId = 0
const database = Mock.mock({
  'data|100': [
    {
      id() {
        postId += 1
        return postId + 10000
      },
      'status|1-2': 1,
      title: '@title',
      author: '@last',
      categories: '@word',
      tags: '@word',
      'views|10-200': 1,
      'comments|10-200': 1,
      visibility: () => {
        return Mock.mock(
          '@pick(["Public",' + '"Password protected", ' + '"Private"])'
        )
      },
      date: '@dateTime',
      image() {
        return Mock.Random.image(
          '100x100',
          Mock.Random.color(),
          '#757575',
          'png',
          this.author.substr(0, 1)
        )
      },
    },
  ],
}).data
function sleep(sleepTime) {
  for(var start = +new Date; +new Date - start <= sleepTime; ) { }
}
module.exports = {
  [`GET ${ApiPrefix}/tasks`](req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter(item => {
          if ({}.hasOwnProperty.call(item, key)) {
            return (
              String(item[key])
                .trim()
                .indexOf(decodeURI(other[key]).trim()) > -1
            )
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
  [`GET ${ApiPrefix}/outside/source`](req, res) {
    res.status(200).json({data:[{
      name:"test_jenkins_1",
      display_name:"测试Jenkins1"
    },{
      name:"test_jenkins_2",
      display_name:"测试Jenkins2"
    }],total:2})
  },
  [`GET ${ApiPrefix}/outside/project`](req, res) {
    res.status(200).json({data:[{
      name:"trade/trade_server",
      display_name:"实时交易处理服务"
    },{
      name:"trade/trade_manager",
      display_name:"交易管理服务"
      }],total:2})
  }
}
