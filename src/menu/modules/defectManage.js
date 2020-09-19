const pre = '/fault/';

export default {
    path: '/fault',
    title: '缺陷管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zhuyi',
    children: [
        {
            path: `/fault`,
            title: '消缺任务'
        }, {
            path: `/defect/declare`,
            title: '缺陷申报',
            auth: ['hidden']
        }, {
            path: `/defect/detail`,
            title: '缺陷详情',
            auth: ['hidden']
        }, {
            path: `/fault/statistics`,
            title: '缺陷统计'
        }
    ]
}
