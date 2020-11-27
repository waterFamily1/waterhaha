import BasicLayout from '@/layouts/basic-layout'
const pre = 'alarm-'

const meta = {
    auth: false
}

export default {
    path: '/alarm',
    title: '报警管理',
    custom: 'icon iconfont i-icon-demo icon-zuoyebaojing',
    redirect: {
        name: `${pre}history`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'history',
            name: `${pre}history`,
            meta: {
                ...meta,
                title: '报警历史',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarmHistory')
        }, {
            path: 'define',
            name: `${pre}define`,
            meta: {
                ...meta,
                title: '报警定义',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarmDefinition')
        }, {
            path: 'alarm/definAdd',
            name: `${pre}alarm-definAdd`,
            meta: {
                ...meta,
                title: '新增报警定义',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarm/definAdd')
        }, {
            path: 'alarm/definCheck',
            name: `${pre}alarm-definCheck`,
            meta: {
                ...meta,
                title: '查看报警定义',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarm/definCheck')
        }, {
            path: 'alarm/definEdit',
            name: `${pre}alarm-definEdit`,
            meta: {
                ...meta,
                title: '编辑报警定义',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarm/definAdd')
        }, {
            path: 'subscribe',
            name: `${pre}subscribe`,
            meta: {
                ...meta,
                title: '报警订阅',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarmTake')
        }, {
            path: 'alarm/takeAdd',
            name: `${pre}alarm-takeAdd`,
            meta: {
                ...meta,
                title: '新增报警订阅',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarm/takeAdd')
        }, {
            path: 'alarm/takeEdit',
            name: `${pre}alarm-takeEdit`,
            meta: {
                ...meta,
                title: '编辑报警订阅',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarm/takeEdit')
        }, {
            path: 'alarm/takeCheck',
            name: `${pre}alarm-takeCheck`,
            meta: {
                ...meta,
                title: '报警订阅详细',
                closable: false
            },
            component: () => import('@/pages/alarmManage/alarm/takeCheck')
        }
    ]
}