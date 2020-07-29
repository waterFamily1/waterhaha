const pre = '/productReport/';

export default {
    path: '/productReport',
    title: '生产报表',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-icon',
    children: [
        {
            path: `${pre}reportBrowse`,
            title: '报表浏览'
        }, {
            path: `${pre}bulletinBrowse`,
            title: '简报浏览'
        }, {
            path: `${pre}reportDeploy`,
            title: '报表配置'
        }, {
            path: `${pre}smartReportDeploy`,
            title: '智能报表配置'
        }
    ]
}
