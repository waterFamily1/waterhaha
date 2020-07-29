import BasicLayout from '@/layouts/basic-layout'
const pre = 'upkeepManage-'

const meta = {
    auth: false
}

export default {
    path: '/upkeepManage',
    title: '保养管理',
    custom: 'icon iconfont i-icon-demo icon-gongren',
    redirect: {
        name: `${pre}upkeepPlan`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'upkeepPlan',
            name: `${pre}upkeepPlan`,
            meta: {
                ...meta,
                title: '保养计划',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeepPlan')
        }, {
            path: 'upkeepTask',
            name: `${pre}upkeepTask`,
            meta: {
                ...meta,
                title: '保养任务',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeepTask')
        }, {
            path: 'upkeepStat',
            name: `${pre}upkeepStat`,
            meta: {
                ...meta,
                title: '保养统计',
                closable: false
            },
            component: () => import('@/pages/upkeepManage/upkeepStat')
        }
    ]
}
