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
            path: '/childPage/adjustAdd',
            name: `${pre}childPage-adjustAdd`,
            meta: {
                ...meta,
                title: '库存调整新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/adjustAdd')
        },
        {          
            path: '/childPage/adjustDetail',
            name: `${pre}childPage-adjustDetail`,
            meta: {
                ...meta,
                title: '库存调整信息',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/adjustDetail')
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
            path: '/childPage/putDetail',
            name: `${pre}childPage-putDetail`,
            meta: {
                ...meta,
                title: '入库详细',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/putDetail')
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
            path: '/childPage/outDetail',
            name: `${pre}childPage-outDetail`,
            meta: {
                ...meta,
                title: '出库详细',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/outDetail')
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
            path: '/childPage/allotDetail',
            name: `${pre}childPage-allotDetail`,
            meta: {
                ...meta,
                title: '调拨详细',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/allotDetail')
        },
        {          
            path: '/childPage/checkAdd',
            name: `${pre}childPage-checkAdd`,
            meta: {
                ...meta,
                title: '盘点新增',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/checkAdd')
        },
        {          
            path: '/childPage/checkDetail',
            name: `${pre}childPage-checkDetail`,
            meta: {
                ...meta,
                title: '盘点信息',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/checkDetail')
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
            path: '/childPage/warehouseDetail',
            name: `${pre}childPage-warehouseDetail`,
            meta: {
                ...meta,
                title: '仓库详细',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/warehouseDetail')
        },
        {          
            path: '/childPage/warehousrEdit',
            name: `${pre}childPage-warehousrEdit`,
            meta: {
                ...meta,
                title: '仓库编辑',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/warehousrEdit')
        },
        {          
            path: '/childPage/warehouseImport',
            name: `${pre}childPage-warehouseImport`,
            meta: {
                ...meta,
                title: '库位导入',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/warehouseImport')
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
        },
        {          
            path: '/childPage/materialDetail',
            name: `${pre}childPage-materialDetail`,
            meta: {
                ...meta,
                title: '物料详细',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/materialDetail')
        },
        {          
            path: '/childPage/materialEdit',
            name: `${pre}childPage-materialEdit`,
            meta: {
                ...meta,
                title: '物料编辑',
                closable: false
            },
            component: () => import('@/pages/storeManage/childPage/materialEdit')
        }
    ]
}