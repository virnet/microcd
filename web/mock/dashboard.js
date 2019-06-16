import { Mock, Constant } from './_utils'

const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
  'sales|8': [
    {
      'name|+1': 2008,
      'Clothes|200-500': 1,
      'Food|180-400': 1,
      'Electronics|300-550': 1,
    },
  ],
  cpu: {
    'usage|50-600': 1,
    space: 825,
    'cpu|40-90': 1,
    'data|20': [
      {
        'cpu|20-80': 1,
      },
    ],
  },
  browser: [
    {
      name: 'Google Chrome',
      percent: 43.3,
      status: 1,
    },
    {
      name: 'Mozilla Firefox',
      percent: 33.4,
      status: 2,
    },
    {
      name: 'Apple Safari',
      percent: 34.6,
      status: 3,
    },
    {
      name: 'Internet Explorer',
      percent: 12.3,
      status: 4,
    },
    {
      name: 'Opera Mini',
      percent: 3.3,
      status: 1,
    },
    {
      name: 'Chromium',
      percent: 2.53,
      status: 1,
    },
  ],
  user: {
    name: 'github',
    sales: 3241,
    sold: 3556,
  },
  'completed|12': [
    {
      'fromNowOn|+1': 1,
      'now|+1':'@now("yyyy-MM-dd")',
      'date|+1'    : function(){
        let now= new Date(this.now);
        now.setTime(now.getTime()-this.fromNowOn*24*60*60*1000);
        let sub=now;
        let year = sub.getFullYear()<10?'0'+sub.getFullYear():sub.getFullYear();
        let month = sub.getMonth() + 1<10?'0'+sub.getMonth():sub.getMonth();
        let day = sub.getDate()<10?'0'+sub.getDate():sub.getDate();
        return year+'-'+month+'-'+day;
      },
      'team_complete|200-1000': 1,
      'user_complete|200-1000': 1,
    },
  ],
  'comments|5': [
    {
      name: '@last',
      'status|1-3': 1,
      content: '@sentence',
      avatar() {
        return Mock.Random.image(
          '48x48',
          Mock.Random.color(),
          '#757575',
          'png',
          this.name.substr(0, 1)
        )
      },
      date() {
        return `2016-${Mock.Random.date('MM-dd')} ${Mock.Random.time(
          'HH:mm:ss'
        )}`
      },
    },
  ],
  'task|36': [
    {
      project: '@last',
      'status|1-7': 1,
      start_time() {
        return `${Mock.Random.integer(2015, 2019)}-${Mock.Random.date(
          'MM-dd'
        )} ${Mock.Random.time('HH:mm:ss')}`
      },
      update_time() {
        return `${Mock.Random.integer(2015, 2019)}-${Mock.Random.date(
          'MM-dd'
        )} ${Mock.Random.time('HH:mm:ss')}`
      },
      'price|10-200.1-2': 1,
      version(){
        return `${Mock.Random.integer(0, 9)}.${Mock.Random.integer(0, 9)}.${Mock.Random.integer(0, 100)}.${Mock.Random.integer(0, 1000)}`
      }
    },
  ],
  quote: {
    name: 'Joho Doe',
    title: 'Graphic Designer',
    content:
      "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
    avatar:
      'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
  },
  numbers: [
    {
      icon: 'pay-circle-o',
      color: Color.green,
      title: 'Online Review',
      number: 2781,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'New Customers',
      number: 3241,
    },
    {
      icon: 'message',
      color: Color.purple,
      title: 'Active Projects',
      number: 253,
    },
    {
      icon: 'shopping-cart',
      color: Color.red,
      title: 'Referrals',
      number: 4324,
    },
  ],
})

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req, res) {
    res.json(Dashboard)
  },
}
