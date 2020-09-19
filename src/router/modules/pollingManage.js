import BasicLayout from '@/layouts/basic-layout'
const pre = 'patrol-'

const meta = {
    auth: false
}

export default {
    path: '/patrol',
    title: '巡检管理',
    custom: 'icon iconfont i-icon-demo icon-ditu',
    redirect: {
        name: `${pre}pollingPlan`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/patrol/plan',
            name: `${pre}patrol-plan`,
            meta: {
                ...meta,
                title: '巡检计划',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingPlan')
        }, {
            path: '/plan/add',
            name: `${pre}plan-add`,
            meta: {
                ...meta,
                title: '巡检计划新增',
                closable: false
            },
            component: () => import('@/pages/pollingManage/plan/add')
        }, {
            path: '/patrol/task',
            name: `${pre}patrol-task`,
            meta: {
                ...meta,
                title: '巡检任务',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingTask')
        }, {
            path: '/patrol/trace',
            name: `${pre}task-trace`,
            meta: {
                ...meta,
                title: '地图巡检跟踪',
                closable: false
            },
            component: () => import('@/pages/pollingManage/mapPolling')
        }, {
            path: '/patrol/statistics',
            name: `${pre}patrol-statistics`,
            meta: {
                ...meta,
                title: '巡检统计',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingStat')
        }, {
            path: '/patrol/point',
            name: `${pre}patrol-point`,
            meta: {
                ...meta,
                title: '巡检点管理',
                closable: false
            },
            component: () => import('@/pages/pollingManage/pollingManage')
        },{
            path: '/addPoint',
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
