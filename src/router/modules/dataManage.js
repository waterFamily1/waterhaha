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
        },{
            path: '/analyze/addManual',
            name: `${pre}analyze-addManual`,
            meta: {
                ...meta,
                title: '新增人工采集测点',
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/addAutomatic')
        },{
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
        }
    ]
}
