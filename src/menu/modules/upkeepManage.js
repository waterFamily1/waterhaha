const pre = '/upkeepManage/';

export default {
    path: '/maintain',
    title: '保养管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-gongren',
    children: [
        {
            path: `/maintain/plan`,
            title: '保养计划'
        }, {
            path: `/upkeep/planDetail`,
            title: '保养计划详情',
            auth: ['hidden']
        }, {
            path: `/upkeep/planAllot`,
            title: '保养计划分配',
            auth: ['hidden']
        }, {
            path: `/maintain/task`,
            title: '保养任务'
        }, {
            path: `/maintain/statistics`,
            title: '保养统计'
        }
    ]
}
