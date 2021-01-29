import BasicLayout from '@/layouts/basic-layout'
const pre = 'system-'

const meta = {
    auth: false
}

export default {
    path: '/system',
    title: '系统管理',
    custom: 'icon iconfont i-icon-demo icon-xitong',
    redirect: {
        name: `${pre}systemRole`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/system/role',
            name: `${pre}role`,
            meta: {
                ...meta,
                title: '角色权限',
                closable: false
            },
            component: () => import('@/pages/systemManage/rolePermission')
        }, {
            path: '/terminal-setting',
            name: `${pre}terminal-setting`,
            meta: {
                ...meta,
                title: '终端配置',
                closable: false
            },
            component: () => import('@/pages/systemManage/terminalDeploy'),
        }, {
            path: '/teminal/addUser',
            name: `${pre}teminal-addUser`,
            meta: {
                ...meta,
                title: '新建',
                closable: false
            },
            component: () => import('@/pages/systemManage/teminal/terminalDetail'),
        }, {
            path: '/teminal/terminalDetail',
            name: `${pre}teminal-terminalDetail`,
            meta: {
                ...meta,
                title: '配置',
                closable: false
            },
            component: () => import('@/pages/systemManage/teminal/terminalDetail'),
        }, {
            path: '/teminal/terminalTest',
            name: `${pre}teminal-terminalTest`,
            meta: {
                ...meta,
                title: '测试',
                closable: false
            },
            component: () => import('@/pages/systemManage/teminal/terminalTest'),
        }, {
            path: '/sim/sim-manager',
            name: `${pre}sim-manager`,
            meta: {
                ...meta,
                title: 'SIM卡管理',
                closable: false
            },
            component: () => import('@/pages/systemManage/SIMManage')
        }, {
            path: '/sim/simDetail',
            name: `${pre}sim-detail`,
            meta: {
                ...meta,
                title: 'SIM卡详情',
                closable: false
            },
            component: () => import('@/pages/systemManage/sim/index')
        }, {
            path: '/indicator',
            name: `${pre}indicator`,
            meta: {
                ...meta,
                title: '指标管理',
                closable: false
            },
            component: () => import('@/pages/systemManage/indexManage')
        }, {
            path: '/index/indexAdd',
            name: `${pre}index-indexAdd`,
            meta: {
                ...meta,
                title: '新增指标',
                closable: false
            },
            component: () => import('@/pages/systemManage/index/indexAdd')
        }, {
            path: '/sim/sim-alarm',
            name: `${pre}sim-alarm`,
            meta: {
                ...meta,
                title: '流量报警设置',
                closable: false
            },
            component: () => import('@/pages/systemManage/flowAlarm')
        }, {
            path: '/alarm/addAlarm',
            name: `${pre}alarm-addAlarm`,
            meta: {
                ...meta,
                title: '新增报警',
                closable: false
            },
            component: () => import('@/pages/systemManage/alarm/addAlarm')
        }, {
            path: '/system/logs',
            name: `${pre}oper-log`,
            meta: {
                ...meta,
                title: '操作日志',
                closable: false
            },
            component: () => import('@/pages/systemManage/handleLog')
        }
    ]
}
