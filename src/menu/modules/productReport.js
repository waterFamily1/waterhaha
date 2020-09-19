const pre = '/productReport/';

export default {
    path: '/report',
    title: '生产报表',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-icon',
    children: [
        {
            path: `/report/`,
            title: '报表浏览'
        }, {
            path: `/report/brief`,
            title: '简报浏览'
        }, {
            path: `/report/setting/normal`,
            title: '报表配置'
        }, {
            path: `/report/setting/smart`,
            title: '智能报表配置'
        }
    ]
}
