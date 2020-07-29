import BasicLayout from '@/layouts/basic-layout'
const pre = 'supervise-'

const meta = {
    auth: false
}

export default {
    path: '/supervise',
    title: '实时监管',
    custom: 'icon iconfont i-icon-demo icon-jianguan',
    redirect: {
        name: `${pre}controlCenter`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'controlCenter',
            name: `${pre}controlCenter`,
            meta: {
                ...meta,
                title: '调度中心',
                closable: false
            },
            component: () => import('@/pages/supervise/controlCenter')
        }, {
            path: 'monitorScreen',
            name: `${pre}monitorScreen`,
            meta: {
                ...meta,
                title: '监视画面',
                closable: false
            },
            component: () => import('@/pages/supervise/monitorScreen')
        }, {
            path: 'screenProfile',
            name: `${pre}screenProfile`,
            meta: {
                ...meta,
                title: '监视画面配置',
                closable: false
            },
            component: () => import('@/pages/supervise/screenProfile')
        }, {
            path: 'screenProfile3D',
            name: `${pre}screenProfile3D`,
            meta: {
                ...meta,
                title: '监视画面配置3D',
                closable: false
            },
            component: () => import('@/pages/supervise/screenProfile3D')
        }
    ]
}
