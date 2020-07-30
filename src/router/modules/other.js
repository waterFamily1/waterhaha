//基础管理 => 导入
import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'other-';

export default {
    path: '/other',
    title: '导入',
    redirect: {
        name: `${pre}other`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'areaUpload',
            name: `${pre}areaUpload`,
            meta: {
                ...meta,
                closable: false
            },
            component: () => import('@/pages/other/areaUpload')
        }
    ]
};
