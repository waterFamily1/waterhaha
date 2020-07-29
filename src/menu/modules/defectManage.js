const pre = '/defectManage/';

export default {
    path: '/defectManage',
    title: '缺陷管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zhuyi',
    children: [
        {
            path: `${pre}absentTask`,
            title: '消缺任务'
        }, {
            path: `${pre}defectStat`,
            title: '缺陷统计'
        }
    ]
}
