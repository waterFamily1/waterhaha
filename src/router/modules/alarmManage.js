import BasicLayout from '@/layouts/basic-layout'
const pre = 'alarmManage-'

const meta = {
    auth: false
}

export default {
    path: '/alarmManage',
    title: '报警管理',
    custom: 'icon iconfont i-icon-demo icon-zuoyebaojing',
    redirect: {
        name: `${pre}alarmHistory`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'alarmHistory',
            name: `${pre}alarmHistory`,
            meta: {
                ...meta,
                title: '报警历史',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarmHistory')
        }, {
            path: 'alarmDefinition',
            name: `${pre}alarmDefinition`,
            meta: {
                ...meta,
                title: '报警定义',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarmDefinition')
        }, {
            path: 'alarmTake',
            name: `${pre}alarmTake`,
            meta: {
                ...meta,
                title: '报警订阅',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarmTake')
        }
    ]
}