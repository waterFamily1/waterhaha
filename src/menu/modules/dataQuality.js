const pre = '/dataQuality/';

export default {
    path: '/data-quality',
    title: '数据质量',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zhiliang',
    children: [
        {
            path: `/data-quality/statistics`,
            title: '质量统计'
        }, {
            path: `/stat/recountLog`,
            title: '重算日志',
            auth: ['hidden']
        }, {
            path: `/data-quality/setting`,
            title: '样本配置'
        }, {
            path: `/data-quality/standard`,
            title: '质量标准'
        }
    ]
}
