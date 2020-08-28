const pre = '/pollingManage/';

export default {
    path: '/pollingManage',
    title: '巡检管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-ditu',
    children: [
        {
            path: `${pre}pollingPlan`,
            title: '巡检计划'
        }, {
            path: `${pre}pollingTask`,
            title: '巡检任务'
        }, {
            path: `${pre}mapPolling`,
            title: '地图巡检跟踪'
        }, {
            path: `${pre}pollingStat`,
            title: '巡检统计'
        }, {
            path: `${pre}pollingManage`,
            title: '巡检点管理'
        },
        {
            path: `${pre}plan/add`,
            title: '巡检计划新增',
            auth: ['hidden']
        }
    ]
}
