import BasicLayout from '@/layouts/basic-layout'
const pre = 'deviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/myAttention',
    title: '我的关注',
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/myAttention',
            name: `${pre}myAttention`,
            meta: {
                ...meta,
                title: '',
                closable: false
            },
            component: () => import('@/pages/header/myAttention')
        }
    ]
}