import BasicLayout from '@/layouts/basic-layout'
const pre = 'dataQuality-'

const meta = {
    auth: false
}

export default {
    path: '/dataQuality',
    title: '数据质量',
    custom: 'icon iconfont i-icon-demo icon-zhiliang',
    redirect: {
        name: `${pre}qualityStat`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'qualityStat',
            name: `${pre}qualityStat`,
            meta: {
                ...meta,
                title: '质量统计',
                closable: false
            },
            component: () => import('@/pages/dataQuality/qualityStat')
        }, {
            path: 'sampleDeploy',
            name: `${pre}sampleDeploy`,
            meta: {
                ...meta,
                title: '样本配置',
                closable: false
            },
            component: () => import('@/pages/dataQuality/sampleDeploy')
        }, {
            path: 'qualityStandard',
            name: `${pre}qualityStandard`,
            meta: {
                ...meta,
                title: '质量标准',
                closable: false
            },
            component: () => import('@/pages/dataQuality/qualityStandard')
        }
    ]
}
