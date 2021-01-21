import BasicLayout from '@/layouts/basic-layout'
const pre = 'deviceManage-'

const meta = {
    auth: false
}

export default {
    path: '/taskBoard',
    title: '任务看板',
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/taskBoard',
            name: `${pre}taskBoard`,
            meta: {
                ...meta,
                title: '',
                closable: false
            },
            component: () => import('@/pages/header/taskBoard')
        }
    ]
}