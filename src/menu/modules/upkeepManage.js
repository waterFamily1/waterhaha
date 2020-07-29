const pre = '/upkeepManage/';

export default {
    path: '/upkeepManage',
    title: '保养管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-gongren',
    children: [
        {
            path: `${pre}upkeepPlan`,
            title: '保养计划'
        }, {
            path: `${pre}upkeepTask`,
            title: '保养任务'
        }, {
            path: `${pre}upkeepStat`,
            title: '保养统计'
        }
    ]
}
