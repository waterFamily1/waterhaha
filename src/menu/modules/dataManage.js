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
            path: `/mpointImport`,
            title: '导入',
            auth: ['hidden']
        }, {
            path: `/mpoint/data-import`,
            title: '测点数据导入'
        }, {
            path: `/task-calc`,
            title: '计算任务'
        }, {
            path: `/simpleForm`,
            title: '新增单测点计算任务',
            auth: ['hidden']
        }, {
            path: `/simpleFormEdit`,
            title: '编辑单测点计算任务',
            auth: ['hidden']
        }, {
            path: `/complexForm`,
            title: '新增多测点计算任务',
            auth: ['hidden']
        }, {
            path: `/complexFormEdit`,
            title: '编辑多测点计算任务',
            auth: ['hidden']
        }, {
            path: `/customForm`,
            title: '新增自定义型计算任务',
            auth: ['hidden']
        }, {
            path: `/customFormEdit`,
            title: '编辑自定义型计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/labourAdd`,
            title: '新增人工数据采集',
            auth: ['hidden']
        }, {
            path: `/bulletin/bulletinAdd`,
            title: '新增简报',
            auth: ['hidden']
        }, {
            path: `/analyze/addAutomatic`,
            title: '新增自动采集测点',
            auth: ['hidden']
        }, {
            path: `/analyze/addLabour`,
            title: '新增人工采集测点',
            auth: ['hidden']
        }, {
            path: `/analyze/addSinglePoint`,
            title: '新增单测点计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/addMorePoint`,
            title: '新增多测点计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/addcustomPoint`,
            title: '新增自定义型计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/automaticSite`,
            title: '自动采集测点详情',
            auth: ['hidden']
        }, {
            path: '/task-detail',
            title: '查看多测点计算任务',
            auth: ['hidden']
        }, {
            path: '/analyze/synthesiSite',
            title: '批量配置综合测点',
            auth: ['hidden']
        }, {
            path: `/analyze/artificialSite`,
            title: '批量配置人工采集测点',
            auth: ['hidden']
        }, {
            path: `/analyze/dataSite`,
            title: '批量配置计算测点',
            auth: ['hidden']
        }, {
            path: `/analyze/checkDataAnalysis`,
            title: '查看数据分析测点',
            auth: ['hidden']
        }, {
            path: `/analyze/checkAutomatic`,
            title: '查看自动采集测点',
            auth: ['hidden']
        }, {
            path: `/analyze/checkCustom`,
            title: '查看自定义型计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/checkMoreSite`,
            title: '查看多测点计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/checkOneSite`,
            title: '查看单测点计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/checkLabour`,
            title: '查看人工采集测点',
            auth: ['hidden']
        }, {
            path: `/analyze/editLabour`,
            title: '编辑人工采集测点',
            auth: ['hidden']
        }, {
            path: `/analyze/editOneSite`,
            title: '编辑单测点计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/editcustomPoint`,
            title: '编辑自定义型计算任务',
            auth: ['hidden']
        }, {
            path: `/analyze/editAutomatic`,
            title: '编辑自动采集测点',
            auth: ['hidden']
        },{
            path: `/analyze/labourCheckForm`,
            title: '查看人工数据采集',
            auth: ['hidden']
        },{
            path: `/analyze/labourEdit`,
            title: '编辑人工数据采集',
            auth: ['hidden']
        },{
            path: `/analyze/labourCheckRecord`,
            title: '人工查看记录',
            auth: ['hidden']
        },{
            path: `/analyze/labourLogData`,
            title: '人工录入数据',
            auth: ['hidden']
        },
        {
            path: `/bulletin/bulletinCheckForm`,
            title: '查看简报数据采集',
            auth: ['hidden']
        },{
            path: `/bulletin/bulletinEdit`,
            title: '编辑简报数据采集',
            auth: ['hidden']
        },{
            path: `/bulletin/bulletinCheckRecord`,
            title: '简报查看记录',
            auth: ['hidden']
        },{
            path: `/bulletin/bulletinLogData`,
            title: '简报录入数据',
            auth: ['hidden']
        },{
            path: `/bulletin/recordDetail`,
            title: '简报记录详情',
            auth: ['hidden']
        }
    ]
}
