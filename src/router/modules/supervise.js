import BasicLayout from '@/layouts/basic-layout'
const pre = 'supervise-'

const meta = {
    auth: false
}

export default {
    path: '/process-view',
    title: '实时监管',
    custom: 'icon iconfont i-icon-demo icon-jianguan',
    redirect: {
        name: `${pre}controlCenter`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/dispatch/map',
            name: `${pre}dispatch-map`,
            meta: {
                ...meta,
                title: '调度中心',
                closable: false
            },
            component: () => import('@/pages/supervise/controlCenter')
        }, {
            path: '/process-view/monitor',
            name: `${pre}process-view-monito`,
            meta: {
                ...meta,
                title: '监视画面',
                closable: false
            },
            component: () => import('@/pages/supervise/monitorScreen')
        }, {
            path: '/process-view/setting/2d',
            name: `${pre}process-view-2d`,
            meta: {
                ...meta,
                title: '监视画面配置',
                closable: false
            },
            component: () => import('@/pages/supervise/screenProfile')
        }, {
            path: '/process-view/setting/3d',
            name: `${pre}process-view-3d`,
            meta: {
                ...meta,
                title: '监视画面配置3D',
                closable: false
            },
            component: () => import('@/pages/supervise/screenProfile3D')
        }
    ]
}
