import BasicLayout from '@/layouts/basic-layout'
const pre = 'repaiR-'

const meta = {
    auth: false
}

export default {
    path: '/repaiR',
    title: '维修管理',
    custom: 'icon iconfont i-icon-demo icon-weixiu',
    redirect: {
        name: `${pre}serviceOrder`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/repair',
            name: `${pre}repair-order`,
            meta: {
                ...meta,
                title: '维修工单',
                closable: false
            },
            component: () => import('@/pages/serviceManage/serviceOrder')
        }, {
            path: '/repair/statistics',
            name: `${pre}repair-statistics`,
            meta: {
                ...meta,
                title: '维修统计',
                closable: false
            },
            component: () => import('@/pages/serviceManage/serviceStat')
        },
        {
            path: '/serviceDetail',
            name: `${pre}serviceDetail`,
            meta: {
                ...meta,
                title: '维修详情',
                closable: false
            },
            component: () => import('@/pages/serviceManage/serviceDetail')
        }
    ]
}
