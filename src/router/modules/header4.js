import BasicLayout from '@/layouts/basic-layout'
const pre = 'deviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/userSet',
    title: '用户设置',
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/userSet',
            name: `${pre}userSet`,
            meta: {
                ...meta,
                title: '',
                closable: false
            },
            component: () => import('@/pages/header/userSet')
        }
    ]
}