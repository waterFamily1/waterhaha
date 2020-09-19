const pre = '/dataManage/';

export default {
    path: '/data-analysis',
    title: '数据管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-wulumuqishigongandashujuguanlipingtai-ico-',
    children: [
        {
            path: `/data-analysis`,
            title: '数据曲线分析'
        }, {
            path: `/data-input/hour`,
            title: '人工数据采集'
        }, {
            path: `/data-input/brief`,
            title: '简报数据采集'
        }, {
            path: `/mpoint`,
            title: '测点管理'
        }, {
            path: `/mpoint/data-import`,
            title: '测点数据导入'
        }, {
            path: `/task-calc`,
            title: '计算任务'
        },{
            path: `/analyze/labourAdd`,
            title: '新增人工数据采集',
            auth: ['hidden']
        },
        {
            path: `/analyze/bulletinAdd`,
            title: '新增简报',
            auth: ['hidden']
        },
        {
            path: `/analyze/addAutomatic`,
            title: '新增自动采集测点',
            auth: ['hidden']
        }
    ]
}
