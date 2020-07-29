import BasicLayout from '@/layouts/basic-layout'
const pre = 'productReport-'

const meta = {
    auth: false
}

export default {
    path: '/productReport',
    title: '生产报表',
    custom: 'icon iconfont i-icon-demo icon-icon',
    redirect: {
        name: `${pre}reportBrowse`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'reportBrowse',
            name: `${pre}reportBrowse`,
            meta: {
                ...meta,
                title: '报表浏览',
                closable: false
            },
            component: () => import('@/pages/productReport/reportBrowse')
        }, {
            path: 'bulletinBrowse',
            name: `${pre}bulletinBrowse`,
            meta: {
                ...meta,
                title: '简报浏览',
                closable: false
            },
            component: () => import('@/pages/productReport/bulletinBrowse')
        }, {
            path: 'reportDeploy',
            name: `${pre}reportDeploy`,
            meta: {
                ...meta,
                title: '报表配置',
                closable: false
            },
            component: () => import('@/pages/productReport/reportDeploy')
        }, {
            path: 'smartReportDeploy',
            name: `${pre}smartReportDeploy`,
            meta: {
                ...meta,
                title: '智能报表配置',
                closable: false
            },
            component: () => import('@/pages/productReport/smartReportDeploy')
        }
    ]
}
