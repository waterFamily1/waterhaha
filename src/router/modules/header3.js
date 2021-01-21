import BasicLayout from '@/layouts/basic-layout'
const pre = 'deviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/newsCenter',
    title: '消息中心',
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/newsCenter',
            name: `${pre}newsCenter`,
            meta: {
                ...meta,
                title: '',
                closable: false
            },
            component: () => import('@/pages/header/newsCenter')
        }
    ]
}