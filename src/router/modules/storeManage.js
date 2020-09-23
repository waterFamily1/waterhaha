import BasicLayout from '@/layouts/basic-layout'
const pre = 'storage-'

const meta = {
    auth: false
}

export default {
    path: '/storage',
    title: '库存管理',
    custom: 'icon iconfont i-icon-demo icon-fangzi01-copy',
    redirect: {
        name: `${pre}stock-search-list`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/storage/stock-search-list',
            name: `${pre}stock-search-list`,
            meta: {
                ...meta,
                title: '库存查询',
                closable: false
            },
            component: () => import('@/pages/storeManage/storeQuery')
        }, {
            path: '/storage/inventory',
            name: `${pre}inventory`,
            meta: {
                ...meta,
                title: '库存调整',
                closable: false
            },
            component: () => import('@/pages/storeManage/storeAdjust')
        }, {
            path: '/storage/checkin',
            name: `${pre}checkin`,
            meta: {
                ...meta,
                title: '入库管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/putStorage')
        }, {
            path: '/storage/checkout',
            name: `${pre}checkout`,
            meta: {
                ...meta,
                title: '出库管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/outStorage')
        }, {
            path: '/storage/allot',
            name: `${pre}allot`,
            meta: {
                ...meta,
                title: '调拨管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/allotManage')
        }, {
            path: '/storage/take-stock',
            name: `${pre}take-stock`,
            meta: {
                ...meta,
                title: '盘点管理',
                closable: false
            },
            component: () => import('@/pages/storeManage/checkManage')
        }, {
            path: '/storage/repertory',
            name: `${pre}repertory`,
            meta: {
                ...meta,
                title: '仓库信息',
                closable: false
            },
            component: () => import('@/pages/storeManage/warehouseInfor')
        }, {
            path: '/storage/material',
            name: `${pre}material`,
            meta: {
                ...meta,
                title: '物料信息',
                closable: false
            },
            component: () => import('@/pages/storeManage/materialInfor')
        }, {
            path: '/storage/material-category',
            name: `${pre}material-category`,
            meta: {
                ...meta,
                title: '物料类别',
                closable: false
            },
            component: () => import('@/pages/storeManage/materialCategory')
        }, {
            path: '/storage/purchase-sale-stock-list',
            name: `${pre}purchase-sale-stock-list`,
            meta: {
                ...meta,
                title: '进销存报表',
                closable: false
            },
            component: () => import('@/pages/storeManage/goodsRntryForm')
        }, {
            path: '/storage/inventory-move-list',
            name: `${pre}inventory-move-list`,
            meta: {
                ...meta,
                title: '库存移动报表',
                closable: false
            },
            component: () => import('@/pages/storeManage/storeMoveForm')
        }, {          
            path: '/storage/inventory-profit-loss-list',
            name: `${pre}inventory-profit-loss-list`,
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
            path: '/childPage/putAdd',
            name: `${pre}childPage-putAdd`,
            meta: {
                ...meta,
                title: '入库新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/putAdd')
        },
        {          
            path: '/childPage/outAdd',
            name: `${pre}childPage-outAdd`,
            meta: {
                ...meta,
                title: '出库新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/outAdd')
        },
        {          
            path: '/childPage/allotAdd',
            name: `${pre}childPage-allotAdd`,
            meta: {
                ...meta,
                title: '调拨新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/allotAdd')
        },
        {          
            path: '/childPage/checkAdd',
            name: `${pre}childPage-checkAdd`,
            meta: {
                ...meta,
                title: '调拨新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/checkAdd')
        },
        {          
            path: '/childPage/warehouseAdd',
            name: `${pre}childPage-warehouseAdd`,
            meta: {
                ...meta,
                title: '仓库新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/warehouseAdd')
        },
        {          
            path: '/childPage/materialAdd',
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
