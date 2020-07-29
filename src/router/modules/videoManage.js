import BasicLayout from '@/layouts/basic-layout'
const pre = 'videoManage-'

const meta = {
    auth: false
}

export default {
    path: '/videoManage',
    title: '视频管理',
    custom: 'icon iconfont i-icon-demo icon-shipinzixun',
    redirect: {
        name: `${pre}RTVideo`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'RTVideo',
            name: `${pre}RTVideo`,
            meta: {
                ...meta,
                title: '实时视频',
                closable: false
            },
            component: () => import('@/pages/videoManage/RTVideo')
        }, {
            path: 'videoCapture',
            name: `${pre}videoCapture`,
            meta: {
                ...meta,
                title: '视频抓拍',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoCapture')
        }, {
            path: 'videoDeploy',
            name: `${pre}videoDeploy`,
            meta: {
                ...meta,
                title: '视频配置',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoDeploy')
        }
    ]
}
