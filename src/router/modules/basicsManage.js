import BasicLayout from '@/layouts/basic-layout'
const pre = 'basic-'

const meta = {
    auth: false
}

export default {
    path: '/basic',
    title: '基础管理',
    custom: 'icon iconfont i-icon-demo icon-jichuxinxi',
    redirect: {
        name: `${pre}org`
    },
    component: BasicLayout,
    meta,
    children: [
        {   
            path: 'org',
            name: `${pre}org`,
            meta: {
                ...meta,
                title: '组织信息',
                closable: false
            },
            component: () => import('@/pages/basicsManage/tissueInfor')
        }, {
            path: 'user',
            name: `${pre}user`,
            meta: {
                ...meta,
                title: '用户信息',
                closable: false
            },
            component: () => import('@/pages/basicsManage/userInfor')
        }, {
            path: 'user/checkUserInfor',
            name: `${pre}user-checkUserInfor`,
            meta: {
                ...meta,
                title: '用户详情',
                closable: false
            },
            component: () => import('@/pages/basicsManage/user/checkUserInfor'),
        }, {
            path: 'user/editUserInfor',
            name: `${pre}user-editUserInfor`,
            meta: {
                ...meta,
                title: '用户编辑',
                closable: false
            },
            component: () => import('@/pages/basicsManage/user/editUserInfor'),
        }, {
            path: 'user/addUserInfor',
            name: `${pre}user-addUserInfor`,
            meta: {
                ...meta,
                title: '新增用户',
                closable: false
            },
            component: () => import('@/pages/basicsManage/user/addUserInfor'),
        }, {
            path: 'process',
            name: `${pre}process`,
            meta: {
                ...meta,
                title: '区域位置信息',
                closable: false
            },
            component: () => import('@/pages/basicsManage/areaSiteInfor')
        }, {
            path: 'equ',
            name: `${pre}equ`,
            meta: {
                ...meta,
                title: '设备类型信息',
                closable: false
            },
            component: () => import('@/pages/basicsManage/deviceKindInfor')
        }
    ]
}
