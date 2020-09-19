import BasicLayout from '@/layouts/basic-layout'
const pre = 'maintain-'

const meta = {
    auth: false
}

export default {
    path: '/maintain',
    title: '保养管理',
    custom: 'icon iconfont i-icon-demo icon-gongren',
    redirect: {
        name: `${pre}upkeepPlan`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/maintain/plan',
            name: `${pre}maintain-plan`,
            meta: {
                ...meta,
                title: '保养计划',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeepPlan')
        }, {
            path: '/upkeep/planDetail',
            name: `${pre}upkeep-planDetail`,
            meta: {
                ...meta,
                title: '保养计划详情',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeep/planDetail')
        }, {
            path: '/upkeep/planAllot',
            name: `${pre}upkeep-planAllot`,
            meta: {
                ...meta,
                title: '保养计划分配',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeep/planAllot')
        }, {
            path: '/maintain/task',
            name: `${pre}maintain-task`,
            meta: {
                ...meta,
                title: '保养任务',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeepTask')
        }, {
            path: '/maintain/statistics',
            name: `${pre}maintain-statistics`,
            meta: {
                ...meta,
                title: '保养统计',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeepStat')
        }
    ]
}
