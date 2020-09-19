import BasicLayout from '@/layouts/basic-layout'
const pre = 'deviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/equU',
    title: '设备管理',
    custom: 'icon iconfont i-icon-demo icon-shebeiguanli',
    redirect: {
        name: `${pre}equ`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/equ',
            name: `${pre}equ`,
            meta: {
                ...meta,
                title: '设备台账',
                closable: false
            },
            component: () => import('@/pages/deviceManage/deviceBook')
        }, {
            path: '/equ/status/list',
            name: `${pre}equ-state`,
            meta: {
                ...meta,
                title: '设备状态',
                closable: false
            },
            component: () => import('@/pages/deviceManage/deviceState')
        },{
            path: '/addBook',
            name: `${pre}addBook`,
            meta: {
                ...meta,
                title: '添加设备',
                closable: false
            },
            component: () => import('@/pages/deviceManage/addBook')
        },
    ]
}
