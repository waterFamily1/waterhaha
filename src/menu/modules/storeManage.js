const pre = '/storeManage/';

export default {
    path: '/storage',
    title: '库存管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-fangzi01-copy',
    children: [
        {
            path: `/storage/stock-search-list`,
            title: '库存查询'
        }, {
            path: `/storage/inventory`,
            title: '库存调整'
        }, {
            path: `/storage/checkin`,
            title: '入库管理'
        }, {
            path: `/storage/checkout`,
            title: '出库管理'
        }, {
            path: `/storage/allot`,
            title: '调拨管理'
        }, {
            path: `/storage/take-stock`,
            title: '盘点管理'
        }, {
            path: `/storage/repertory`,
            title: '仓库信息'
        }, {
            path: `/storage/material`,
            title: '物料信息'
        }, {
            path: `/storage/material-category`,
            title: '物料类别'
        }, {
            path: `/storage/purchase-sale-stock-list`,
            title: '进销存报表'
        }, {
            path: `/storage/inventory-move-list`,
            title: '库存移动报表'
        }, {
            path: `/storage/inventory-profit-loss-list`,
            title: '盘点盈亏报表'
        },{
            path: `/childPage/adjustAdd`,
            title: '库存调整新增',
            auth: ['hidden']
        },{          
            path: `/childPage/adjustDetail`,
            title: '库存调整信息',
            auth: ['hidden']
        },{
            path: `/childPage/putAdd`,
            title: '入库新增',
            auth: ['hidden']
        },{
            path: `/childPage/putDetail`,
            title: '入库详细',
            auth: ['hidden']
        }, {
            path: `/childPage/outAdd`,
            title: '出库新增',
            auth: ['hidden']
        },{
            path: `/childPage/allotAdd`,
            title: '调拨新增',
            auth: ['hidden']
        },{
            path: `/childPage/checkAdd`,
            title: '盘点新增',
            auth: ['hidden']
        },{
            path: `/childPage/warehouseAdd`,
            title: '仓库新增',
            auth: ['hidden']
        },{
            path: `/childPage/materialAdd`,
            title: '物料新增',
            auth: ['hidden']
        }
    ]
}
