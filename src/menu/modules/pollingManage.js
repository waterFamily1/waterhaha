const pre = '/pollingManage/';

export default {
    path: '/patrol',
    title: '巡检管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-ditu',
    children: [
        {
            path: `/patrol/plan`,
            title: '巡检计划'
        }, {
            path: `/patrol/task`,
            title: '巡检任务'
        }, {
            path: `/patrol/trace`,
            title: '地图巡检跟踪'
        }, {
            path: `/patrol/statistics`,
            title: '巡检统计'
        }, {
            path: `/patrol/point`,
            title: '巡检点管理'
        },
        {
            path: `/plan/add`,
            title: '巡检计划新增',
            auth: ['hidden']
        },
        {
            path: `/addPoint`,
            title: '巡检点新增',
            auth: ['hidden']
        }
    ]
}
