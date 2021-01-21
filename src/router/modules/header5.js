import BasicLayout from '@/layouts/basic-layout'
const pre = 'deviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/question',
    title: '问题反馈',
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/question',
            name: `${pre}question`,
            meta: {
                ...meta,
                title: '',
                closable: false
            },
            component: () => import('@/pages/header/question')
        }
    ]
}