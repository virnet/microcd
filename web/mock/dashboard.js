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
