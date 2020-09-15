import BasicLayout from '@/layouts/basic-layout'
const pre = 'storeManage-'

const meta = {
    auth: false
}

export default {
    path: '/storeManage',
    title: '库存管理',
    custom: 'icon iconfont i-icon-demo icon-fangzi01-copy',
    redirect: {
        name: `${pre}storeQuery`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'storeQuery',
            name: `${pre}storeQuery`,
            meta: {
                ...meta,
                title: '库存查询',
                closable: false
            },
            component: () => import('@/pages/storeManage/storeQuery')
        }, {
            path: 'storeAdjust',
            name: `${pre}storeAdjust`,
            meta: {
                ...meta,
                title: '库存调整',
                closable: false
            },
            component: () => import('@/pages/storeManage/storeAdjust')
        }, {
            path: 'putStorage',
            name: `${pre}putStorage`,
            meta: {
                ...meta,
                title: '入库管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/putStorage')
        }, {
            path: 'outStorage',
            name: `${pre}outStorage`,
            meta: {
                ...meta,
                title: '出库管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/outStorage')
        }, {
            path: 'allotManage',
            name: `${pre}allotManage`,
            meta: {
                ...meta,
                title: '调拨管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/allotManage')
        }, {
            path: 'checkManage',
            name: `${pre}checkManage`,
            meta: {
                ...meta,
                title: '盘点管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/checkManage')
        }, {
            path: 'warehouseInfor',
            name: `${pre}warehouseInfor`,
            meta: {
                ...meta,
                title: '仓库信息',
                closable: false
            },
            component: () => import('@/pages/storeManage/warehouseInfor')
        }, {
            path: 'materialInfor',
            name: `${pre}materialInfor`,
            meta: {
                ...meta,
                title: '物料信息',
                closable: false
            },
            component: () => import('@/pages/storeManage/materialInfor')
        }, {
            path: 'materialCategory',
            name: `${pre}materialCategory`,
            meta: {
                ...meta,
                title: '物料类别',
                closable: false
            },
            component: () => import('@/pages/storeManage/materialCategory')
        }, {
            path: 'goodsRntryForm',
            name: `${pre}goodsRntryForm`,
            meta: {
                ...meta,
                title: '进销存报表',
                closable: false
            },
            component: () => import('@/pages/storeManage/goodsRntryForm')
        }, {
            path: 'storeMoveForm',
            name: `${pre}storeMoveForm`,
            meta: {
                ...meta,
                title: '库存移动报表',
                closable: false
            },
            component: () => import('@/pages/storeManage/storeMoveForm')
        }, {          
            path: 'checkPLForm',
            name: `${pre}checkPLForm`,
            meta: {
                ...meta,
                title: '盘点盈亏报表',
                closable: false
            },
            component: () => import('@/pages/storeManage/checkPLForm')
        },
        {          
            path: 'childPage/adjustAdd',
            name: `${pre}childPage-adjustAdd`,
            meta: {
                ...meta,
                title: '库存调整新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/adjustAdd')
        },
        {          
            path: 'childPage/putAdd',
            name: `${pre}childPage-putAdd`,
            meta: {
                ...meta,
                title: '入库新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/putAdd')
        },
        {          
            path: 'childPage/outAdd',
            name: `${pre}childPage-outAdd`,
            meta: {
                ...meta,
                title: '出库新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/outAdd')
        },
        {          
            path: 'childPage/allotAdd',
            name: `${pre}childPage-allotAdd`,
            meta: {
                ...meta,
                title: '调拨新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/allotAdd')
        },
        {          
            path: 'childPage/checkAdd',
            name: `${pre}childPage-checkAdd`,
            meta: {
                ...meta,
                title: '调拨新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/checkAdd')
        },
        {          
            path: 'childPage/warehouseAdd',
            name: `${pre}childPage-warehouseAdd`,
            meta: {
                ...meta,
                title: '仓库新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/warehouseAdd')
        },
        {          
            path: 'childPage/materialAdd',
            name: `${pre}childPage-materialAdd`,
            meta: {
                ...meta,
                title: '物料新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/materialAdd')
        }
    ]
}
