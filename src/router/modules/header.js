//基础管理 => 导入
import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'header-';

export default {
    path: '/header',
    title: '头部',
    redirect: {
        name: `${pre}heder`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'myAttention',
            name: `${pre}myAttention`,
            meta: {
                ...meta,
                closable: false
            },
            component: () => import('@/pages/header/myAttention')
        }
    ]
};
