import BasicLayout from '@/layouts/basic-layout'
const pre = 'pollingManage-'

const meta = {
    auth: false
}

export default {
    path: '/pollingManage',
    title: '巡检管理',
    custom: 'icon iconfont i-icon-demo icon-ditu',
    redirect: {
        name: `${pre}pollingPlan`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'pollingPlan',
            name: `${pre}pollingPlan`,
            meta: {
                ...meta,
                title: '巡检计划',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingPlan')
        }, {
            path: 'plan/add',
            name: `${pre}plan-add`,
            meta: {
                ...meta,
                title: '巡检计划新增',
                closable: false
            },
            component: () => import('@/pages/pollingManage/plan/add')
        }, {
            path: 'pollingTask',
            name: `${pre}pollingTask`,
            meta: {
                ...meta,
                title: '巡检任务',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingTask')
        }, {
            path: 'mapPolling',
            name: `${pre}mapPolling`,
            meta: {
                ...meta,
                title: '地图巡检跟踪',
                closable: false
            },
            component: () => import('@/pages/pollingManage/mapPolling')
        }, {
            path: 'pollingStat',
            name: `${pre}pollingStat`,
            meta: {
                ...meta,
                title: '巡检统计',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingStat')
        }, {
            path: 'pollingManage',
            name: `${pre}pollingManage`,
            meta: {
                ...meta,
                title: '巡检点管理',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingManage')
        },{
            path: 'addPoint',
            name: `${pre}addPoint`,
            meta: {
                ...meta,
                title: '巡检点新增',
                closable: false
            },
            component: () => import('@/pages/pollingManage/addPoint')
        }
    ]
}
