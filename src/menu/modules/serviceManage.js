const pre = '/serviceManage/';

export default {
    path: '/serviceManage',
    title: '维修管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-weixiu',
    children: [
        {
            path: `${pre}serviceOrder`,
            title: '维修工单'
        }, {
            path: `${pre}serviceStat`,
            title: '维修统计'
        },
        {
            path: `${pre}serviceDetail`,
            title: '维修详情',
            auth: ['hidden']
        }
    ]
}
