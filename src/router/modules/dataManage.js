import BasicLayout from '@/layouts/basic-layout'
const pre = 'data-'

const meta = {
    auth: false
}

export default {
    path: '/data',
    title: '数据管理',
    custom: 'icon iconfont i-icon-demo icon-wulumuqishigongandashujuguanlipingtai-ico-',
    redirect: {
        name: `${pre}data-analysis`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/data-analysis',
            name: `${pre}data-analysis`,
            meta: {
                ...meta,
                title: '数据曲线分析',
                closable: false
            },
            component: () => import('@/pages/dataManage/curveAnalysis')
        }, {
            path: '/data-input/hour',
            name: `${pre}data-input-hour`,
            meta: {
                ...meta,
                title: '人工数据采集',
                closable: false
            },
            component: () => import('@/pages/dataManage/labourData')
        },{
            path: '/analyze/labourAdd',
            name: `${pre}analyze-labourAdd`,
            meta: {
                ...meta,
                title: '人工数据新增', 
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/labourAdd'),
        },{
            path: '/data-input/brief',
            name: `${pre}data-input-brief`,
            meta: {
                ...meta,
                title: '简报数据采集',
                closable: false
            },
            component: () => import('@/pages/dataManage/bulletinData')
        },{
            path: '/analyze/bulletinAdd',
            name: `${pre}analyze-bulletinAdd`,
            meta: {
                ...meta,
                title: '简报数据新增', 
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/bulletinAdd'),
        },{
            path: '/mpoint',
            name: `${pre}mpoint`,
            meta: {
                ...meta,
                title: '测点管理',
                closable: false
            },
            component: () => import('@/pages/dataManage/SiteManage')
        }, {
            path: '/analyze/addAutomatic',
            name: `${pre}analyze-addAutomatic`,
            meta: {
                ...meta,
                title: '新增自动采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addAutomatic')
        }, {
            path: '/analyze/addLabour',
            name: `${pre}analyze-addLabour`,
            meta: {
                ...meta,
                title: '新增人工采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addLabour')
        }, {
            path: '/analyze/addSinglePoint',
            name: `${pre}analyze-addSinglePoint`,
            meta: {
                ...meta,
                title: '新增单测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addSinglePoint')
        }, {
            path: '/analyze/addMorePoint',
            name: `${pre}analyze-addMorePoint`,
            meta: {
                ...meta,
                title: '新增多测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addMorePoint')
        }, {
            path: '/analyze/addcustomPoint',
            name: `${pre}analyze-addcustomPoint`,
            meta: {
                ...meta,
                title: '新增自定义型计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addcustomPoint')
        }, {
            path: '/analyze/checkDataAnalysis',
            name: `${pre}analyze-checkDataAnalysis`,
            meta: {
                ...meta,
                title: '查看数据分析测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/checkDataAnalysis')
        }, {
            path: '/analyze/checkAutomatic',
            name: `${pre}analyze-checkAutomatic`,
            meta: {
                ...meta,
                title: '查看自动采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/checkAutomatic')
        }, {
            path: '/analyze/checkCustom',
            name: `${pre}analyze-checkCustom`,
            meta: {
                ...meta,
                title: '查看自定义型计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/checkCustom')
        }, {
            path: '/analyze/checkMoreSite',
            name: `${pre}analyze-checkMoreSite`,
            meta: {
                ...meta,
                title: '查看多测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/checkMoreSite')
        }, {
            path: '/analyze/checkOneSite',
            name: `${pre}analyze-checkOneSite`,
            meta: {
                ...meta,
                title: '查看单测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/checkOneSite')
        }, {
            path: '/analyze/checkLabour',
            name: `${pre}analyze-checkLabour`,
            meta: {
                ...meta,
                title: '查看人工采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/checkLabour')
        }, {
            path: '/analyze/synthesiSite',
            name: `${pre}analyze-synthesiSite`,
            meta: {
                ...meta,
                title: '批量配置综合测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/synthesiSite')
        }, {
            path: `/analyze/automaticSite`,
            name: `${pre}analyze-automaticSite`,
            meta: {
                ...meta,
                title: '自动采集测点详情',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/automaticSite')
        }, {
            path: '/analyze/artificialSite',
            name: `${pre}analyze-artificialSite`,
            meta: {
                ...meta,
                title: '批量配置人工采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/artificialSite')
        }, {
            path: '/analyze/dataSite',
            name: `${pre}analyze-dataSite`,
            meta: {
                ...meta,
                title: '批量配置计算测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/dataSite')
        }, {
            path: '/analyze/addManual',
            name: `${pre}analyze-addManual`,
            meta: {
                ...meta,
                title: '新增人工采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addAutomatic')
        }, {
            path: '/analyze/editLabour',
            name: `${pre}analyze-editLabour`,
            meta: {
                ...meta,
                title: '编辑人工采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/editLabour')
        }, {
            path: '/analyze/editOneSite',
            name: `${pre}analyze-editOneSite`,
            meta: {
                ...meta,
                title: '编辑单测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/editOneSite')
        }, {
            path: '/analyze/editMoreSite',
            name: `${pre}analyze-editMoreSite`,
            meta: {
                ...meta,
                title: '编辑多测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/editMoreSite')
        }, {
            path: '/analyze/editcustomPoint',
            name: `${pre}analyze-editcustomPoint`,
            meta: {
                ...meta,
                title: '编辑自定义型计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/editcustomPoint')
        }, {
            path: '/analyze/editAutomatic',
            name: `${pre}analyze-editAutomatic`,
            meta: {
                ...meta,
                title: '编辑自动采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/editAutomatic')
        }, {
            path: '/mpoint/data-import',
            name: `${pre}mpoint-data-import`,
            meta: {
                ...meta,
                title: '测点数据导入',
                closable: false
            },
            component: () => import('@/pages/dataManage/siteDataImport')
        }, {
            path: '/task-calc',
            name: `${pre}task-calc`,
            meta: {
                ...meta,
                title: '计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/calculationMisson')
        }, {
            path: '/task-detail',
            name: `${pre}task-detail`,
            meta: {
                ...meta,
                title: '查看多测点计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/task/taskDetail')
        }
    ]
}
