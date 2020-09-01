import BasicLayout from '@/layouts/basic-layout'
const pre = 'serviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/serviceManage',
    title: '维修管理',
    custom: 'icon iconfont i-icon-demo icon-weixiu',
    redirect: {
        name: `${pre}serviceOrder`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'serviceOrder',
            name: `${pre}serviceOrder`,
            meta: {
                ...meta,
                title: '维修工单',
                closable: false
            },
            component: () => import('@/pages/serviceManage/serviceOrder')
        }, {
            path: 'serviceStat',
            name: `${pre}serviceStat`,
            meta: {
                ...meta,
                title: '维修统计',
                closable: false
            },
            component: () => import('@/pages/serviceManage/serviceStat')
        },
        {
            path: 'serviceDetail',
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
