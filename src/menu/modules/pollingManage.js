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
        }, {
            path: `/plan/edit`,
            title: '巡检计划编辑',
            auth: ['hidden']
        },
        {
            path: `/plan/add`,
            title: '巡检计划新增',
            auth: ['hidden']
        },{
            path: `/plan/detail`,
            title: '巡检计划详情',
            auth: ['hidden']
        },{
            path: `/addPoint`,
            title: '巡检点新增',
            auth: ['hidden']
        },
        {
            path: `/pointDetail`,
            title: '巡检点详情',
            auth: ['hidden']
        },
        {
            path: `/pointEdit`,
            title: '巡检点编辑',
            auth: ['hidden']
        },
        {
            path: `/task/detail`,
            title: '巡检任务详情',
            auth: ['hidden']
        },
        {
            path: `/plan/editMap`,
            title: '编辑巡检计划地图',
            auth: ['hidden']
        },
    ]
}
