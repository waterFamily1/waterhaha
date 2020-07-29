import BasicLayout from '@/layouts/basic-layout'
const pre = 'defectManage-'

const meta = {
    auth: false
}

export default {
    path: '/defectManage',
    title: '缺陷管理',
    custom: 'icon iconfont i-icon-demo icon-zhuyi',
    redirect: {
        name: `${pre}absentTask`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'absentTask',
            name: `${pre}absentTask`,
            meta: {
                ...meta,
                title: '消缺任务',
                closable: false
            },
            component: () => import('@/pages/defectManage/absentTask')
        }, {
            path: 'defectStat',
            name: `${pre}defectStat`,
            meta: {
                ...meta,
                title: '缺陷统计',
                closable: false
            },
            component: () => import('@/pages/defectManage/defectStat')
        }
    ]
}
