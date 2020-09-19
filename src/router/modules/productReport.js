import BasicLayout from '@/layouts/basic-layout'
const pre = 'report-'

const meta = {
    auth: false
}

export default {
    path: '/reportR',
    title: '生产报表',
    custom: 'icon iconfont i-icon-demo icon-icon',
    redirect: {
        name: `${pre}report-list`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/report',
            name: `${pre}report-list`,
            meta: {
                ...meta,
                title: '报表浏览',
                closable: false
            },
            component: () => import('@/pages/productReport/reportBrowse')
        }, {
            path: '/report/brief',
            name: `${pre}report-brief`,
            meta: {
                ...meta,
                title: '简报浏览',
                closable: false
            },
            component: () => import('@/pages/productReport/bulletinBrowse')
        }, {
            path: '/report/setting/normal',
            name: `${pre}report-normal`,
            meta: {
                ...meta,
                title: '报表配置',
                closable: false
            },
            component: () => import('@/pages/productReport/reportDeploy')
        }, {
            path: '/report/setting/smart',
            name: `${pre}report-smart`,
            meta: {
                ...meta,
                title: '智能报表配置',
                closable: false
            },
            component: () => import('@/pages/productReport/smartReportDeploy')
        }
    ]
}
