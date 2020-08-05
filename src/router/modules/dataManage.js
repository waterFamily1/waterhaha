import BasicLayout from '@/layouts/basic-layout'
const pre = 'dataManage-'

const meta = {
    auth: false
}

export default {
    path: '/dataManage',
    title: '数据管理',
    custom: 'icon iconfont i-icon-demo icon-wulumuqishigongandashujuguanlipingtai-ico-',
    redirect: {
        name: `${pre}curveAnalysis`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'curveAnalysis',
            name: `${pre}curveAnalysis`,
            meta: {
                ...meta,
                title: '数据曲线分析',
                closable: false
            },
            component: () => import('@/pages/dataManage/curveAnalysis')
        }, {
            path: 'labourData',
            name: `${pre}labourData`,
            meta: {
                ...meta,
                title: '人工数据采集',
                closable: false
            },
            component: () => import('@/pages/dataManage/labourData')
        },{
            path: 'analyze/labourAdd',
            name: `${pre}analyze-labourAdd`,
            meta: {
                ...meta,
                title: '人工数据新增', 
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/labourAdd'),
        },{
            path: 'bulletinData',
            name: `${pre}bulletinData`,
            meta: {
                ...meta,
                title: '简报数据采集',
                closable: false
            },
            component: () => import('@/pages/dataManage/bulletinData')
        },{
            path: 'analyze/bulletinAdd',
            name: `${pre}analyze-bulletinAdd`,
            meta: {
                ...meta,
                title: '简报数据新增', 
                closable: false
            },
            component: () => import('@/pages/dataManage/analyze/bulletinAdd'),
        },{
            path: 'SiteManage',
            name: `${pre}SiteManage`,
            meta: {
                ...meta,
                title: '测点管理',
                closable: false
            },
            component: () => import('@/pages/dataManage/SiteManage')
        }, {
            path: 'siteDataImport',
            name: `${pre}siteDataImport`,
            meta: {
                ...meta,
                title: '测点数据导入',
                closable: false
            },
            component: () => import('@/pages/dataManage/siteDataImport')
        }, {
            path: 'calculationMisson',
            name: `${pre}calculationMisson`,
            meta: {
                ...meta,
                title: '计算任务',
                closable: false
            },
            component: () => import('@/pages/dataManage/calculationMisson')
        }
    ]
}
