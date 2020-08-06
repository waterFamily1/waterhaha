const pre = '/dataManage/';

export default {
    path: '/dataManage',
    title: '数据管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-wulumuqishigongandashujuguanlipingtai-ico-',
    children: [
        {
            path: `${pre}curveAnalysis`,
            title: '数据曲线分析'
        }, {
            path: `${pre}labourData`,
            title: '人工数据采集'
        }, {
            path: `${pre}bulletinData`,
            title: '简报数据采集'
        }, {
            path: `${pre}SiteManage`,
            title: '测点管理'
        }, {
            path: `${pre}siteDataImport`,
            title: '测点数据导入'
        }, {
            path: `${pre}calculationMisson`,
            title: '计算任务'
        },{
            path: `${pre}analyze/labourAdd`,
            title: '新增人工数据采集',
            auth: ['hidden']
        },
        {
            path: `${pre}analyze/bulletinAdd`,
            title: '新增简报',
            auth: ['hidden']
        }
    ]
}
