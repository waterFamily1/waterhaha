import BasicLayout from '@/layouts/basic-layout'
const pre = 'data-'

const meta = {
    auth: false
}

export default {
    path: '/data',
    title: '数据质量',
    custom: 'icon iconfont i-icon-demo icon-zhiliang',
    redirect: {
        name: `${pre}data-quality-statistics`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/data-quality/statistics',
            name: `${pre}data-quality-statistics`,
            meta: {
                ...meta,
                title: '质量统计',
                closable: false
            },
            component: () => import('@/pages/dataQuality/qualityStat')
        }, {
            path: '/stat/recountLog',
            name: `${pre}stat-recountLog`,
            meta: {
                ...meta,
                title: '重算日志',
                closable: false
            },
            component: () => import('@/pages/dataQuality/stat/recountLog')
        }, {
            path: '/data-quality/setting',
            name: `${pre}data-quality-setting`,
            meta: {
                ...meta,
                title: '样本配置',
                closable: false
            },
            component: () => import('@/pages/dataQuality/sampleDeploy')
        }, {
            path: '/stat/detailSetting',
            name: `${pre}stat-detailSetting`,
            meta: {
                ...meta,
                title: '测点数据质量详情',
                closable: false
            },
            component: () => import('@/pages/dataQuality/stat/detailSetting')
        },
        {
            path: '/data-quality/standard',
            name: `${pre}data-quality-standard`,
            meta: {
                ...meta,
                title: '质量标准',
                closable: false
            },
            component: () => import('@/pages/dataQuality/qualityStandard')
        }
    ]
}
