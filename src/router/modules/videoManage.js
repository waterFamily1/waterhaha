import BasicLayout from '@/layouts/basic-layout'
const pre = 'monitor-'

const meta = {
    auth: false
}

export default {
    path: '/monitor',
    title: '视频管理',
    custom: 'icon iconfont i-icon-demo icon-shipinzixun',
    redirect: {
        name: `${pre}RTVideo`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/monitor-screen/monitor',
            name: `${pre}monitor-screen`,
            meta: {
                ...meta,
                title: '实时视频',
                closable: false
            },
            component: () => import('@/pages/videoManage/RTVideo')
        }, {
            path: '/monitor-screen/capture',
            name: `${pre}monitor-capture`,
            meta: {
                ...meta,
                title: '视频抓拍',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoCapture')
        }, {
            path: '/video',
            name: `${pre}video`,
            meta: {
                ...meta,
                title: '视频配置',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoDeploy')
        }, {
            path: '/videoD/addVideo',
            name: `${pre}videoD-addVideo`,
            meta: {
                ...meta,
                title: '视频添加',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoD/addVideo')
        }, {
            path: '/videoD/editVideo',
            name: `${pre}videoD-editVideo`,
            meta: {
                ...meta,
                title: '视频编辑',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoD/addVideo')
        }, {
            path: '/videoD/checkVideo',
            name: `${pre}videoD-checkVideo`,
            meta: {
                ...meta,
                title: '视频详情',
                closable: false
            },
            component: () => import('@/pages/videoManage/videoD/checkVideo')
        }
    ]
}
