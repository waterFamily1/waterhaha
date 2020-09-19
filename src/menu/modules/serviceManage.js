const pre = '/serviceManage/';

export default {
    path: '/repaiR',
    title: '维修管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-weixiu',
    children: [
        {
            path: `/repair`,
            title: '维修工单'
        }, {
            path: `/repair/statistics`,
            title: '维修统计'
        },
        {
            path: `/serviceDetail`,
            title: '维修详情',
            auth: ['hidden']
        }
    ]
}
