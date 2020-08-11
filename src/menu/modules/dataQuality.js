const pre = '/dataQuality/';

export default {
    path: '/dataQuality',
    title: '数据质量',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zhiliang',
    children: [
        {
            path: `${pre}qualityStat`,
            title: '质量统计'
        }, {
            path: `${pre}stat/recountLog`,
            title: '重算日志',
            auth: ['hidden']
        }, {
            path: `${pre}sampleDeploy`,
            title: '样本配置'
        }, {
            path: `${pre}qualityStandard`,
            title: '质量标准'
        }
    ]
}
