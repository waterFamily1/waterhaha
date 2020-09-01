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
            path: `${pre}defect/declare`,
            title: '缺陷申报',
            auth: ['hidden']
        }, {
            path: `${pre}defect/detail`,
            title: '缺陷详情',
            auth: ['hidden']
        }, {
            path: `${pre}defectStat`,
            title: '缺陷统计'
        }
    ]
}
