//遍历返回路由

let basic = [
    {
        path: `/user/checkUserInfor`,
        title: '用户详情',
        auth: ['hidden'] 
    }, {
        path: `/user/editUserInfor`,
        title: '用户编辑',
        auth: ['hidden']
    }, {
        path: `/user/addUserInfor`,
        title: '新增用户',
        auth: ['hidden']
    }
]

let system = [
    {
        path: `/teminal/addUser`,
        title: '新建',
        auth: ['hidden']
    }, {
        path: `/teminal/terminalDetail`,
        title: '配置',
        auth: ['hidden']
    }, {
        path: `/teminal/terminalTest`,
        title: '测试',
        auth: ['hidden']
    }, {
        path: `/index/indexAdd`,
        title: '新增指标',
        auth: ['hidden']
    }, {
        path: `/alarm/addAlarm`,
        title: '新增报警',
        auth: ['hidden']
    }, {
        path: '/sim/simDetail',
        title: 'SIM卡详情',
        auth: ['hidden']
    }
]

let  dataQuality = [
    {
        path : `/stat/detailSetting`,
        title :'测点数据质量详情',
        auth: ['hidden']
    }
]

let dataManage = [
    {
        path: '/task-detailSimple',
        title: '查看单测点计算任务',
        auth: ['hidden']
    }, {
        path: '/task-detailComplex',
        title: '查看多测点计算任务',
        auth: ['hidden']
    }, {
        path: '/task-detailCustom',
        title: '查看自定义型计算任务',
        auth: ['hidden']
    }, {
        path: '/analyze/synthesiSite',
        title: '批量配置综合测点',
        auth: ['hidden']
    }, {
        path: `/analyze/addAutomatic`,
        title: '新增自动采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/addLabour`,
        title: '新增人工采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/addSinglePoint`,
        title: '新增单测点计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/addMorePoint`,
        title: '新增多测点计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/addcustomPoint`,
        title: '新增自定义型计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/automaticSite`,
        title: '自动采集测点详情',
        auth: ['hidden']
    }, {
        path: `/analyze/artificialSite`,
        title: '批量配置人工采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/dataSite`,
        title: '批量配置计算测点',
        auth: ['hidden']
    }, {
        path: `/analyze/checkDataAnalysis`,
        title: '查看数据分析测点',
        auth: ['hidden']
    }, {
        path: `/analyze/checkAutomatic`,
        title: '查看自动采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/checkCustom`,
        title: '查看自定义型计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/checkMoreSite`,
        title: '查看多测点计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/checkOneSite`,
        title: '查看单测点计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/checkLabour`,
        title: '查看人工采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/editLabour`,
        title: '编辑人工采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/editOneSite`,
        title: '编辑单测点计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/editMoreSite`,
        title: '编辑多测点计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/editcustomPoint`,
        title: '编辑自定义型计算任务',
        auth: ['hidden']
    }, {
        path: `/analyze/editAutomatic`,
        title: '编辑自动采集测点',
        auth: ['hidden']
    }, {
        path: `/analyze/labourCheckForm`,
        title: '查看人工数据采集',
        auth: ['hidden']
    }, {
        path: `/analyze/labourEdit`,
        title: '编辑人工数据采集',
        auth: ['hidden']
    },{
        path: `/analyze/labourCheckRecord`,
        title: '人工查看记录',
        auth: ['hidden']
    }, {
        path: `/analyze/labourLogData`,
        title: '人工录入数据',
        auth: ['hidden']
    },{
        path: `/bulletin/bulletinCheckForm`,
        title: '查看简报数据采集',
        auth: ['hidden']
    }, {
        path: `/bulletin/bulletinEdit`,
        title: '编辑简报数据采集',
        auth: ['hidden']
    },{
        path: `/bulletin/bulletinCheckRecord`,
        title: '简报查看记录',
        auth: ['hidden']
    }, {
        path: `/bulletin/bulletinLogData`,
        title: '简报录入数据',
        auth: ['hidden']
    }, {
        path: `/bulletin/recordDetail`,
        title: '简报记录详情',
        auth: ['hidden']
    }, {
        path: `/simpleForm`,
        title: '新增单测点计算任务',
        auth: ['hidden']
    }, {
        path: `/simpleFormEdit`,
        title: '编辑单测点计算任务',
        auth: ['hidden']
    }, {
        path: `/complexForm`,
        title: '新增多测点计算任务',
        auth: ['hidden']
    }, {
        path: `/complexFormEdit`,
        title: '编辑多测点计算任务',
        auth: ['hidden']
    }, {
        path: `/customForm`,
        title: '新增自定义型计算任务',
        auth: ['hidden']
    }, {
        path: `/customFormEdit`,
        title: '编辑自定义型计算任务',
        auth: ['hidden']
    }
]

let deviceManage = [
    {
        path: `/addBook`,
        title: '添加设备',
        auth: ['hidden']
    }, {
        path: `/checkBook`,
        title: '设备详情',
        auth: ['hidden']
    }, {
        path: `/editDetail`,
        title: '设备详情',
        auth: ['hidden']
    }, {
        path: `/editStateDetail`,
        title: '设备状态详情',
        auth: ['hidden']
    }
]

let serviceManage = [
    {
        path: `/serviceDetail`,
        title: '维修详情',
        auth: ['hidden']
    }
]

let storeManage = [
    {
        path: `/childPage/adjustAdd`,
        title: '库存调整新增',
        auth: ['hidden']
    }, {          
        path: `/childPage/adjustDetail`,
        title: '库存调整信息',
        auth: ['hidden']
    }, {
        path: `/childPage/putAdd`,
        title: '入库新增',
        auth: ['hidden']
    }, {
        path: `/childPage/putDetail`,
        title: '入库详细',
        auth: ['hidden']
    }, {
        path: `/childPage/outDetail`,
        title: '出库详细',
        auth: ['hidden']
    }, {
        path: `/childPage/allotAdd`,
        title: '调拨新增',
        auth: ['hidden']
    }, {
        path: `/childPage/allotDetail`,
        title: '调拨详细',
        auth: ['hidden']
    }, {
        path: `/childPage/checkAdd`,
        title: '盘点新增',
        auth: ['hidden']
    }, {
        path: `/childPage/checkDetail`,
        title: '盘点信息',
        auth: ['hidden']
    }, {
        path: `/childPage/warehouseAdd`,
        title: '仓库新增',
        auth: ['hidden']
    }, {
        path: `/childPage/warehouseDetail`,
        title: '仓库详细',
        auth: ['hidden']
    }, {
        path: `/childPage/warehousrEdit`,
        title: '仓库编辑',
        auth: ['hidden']
    }, {
        path: `/childPage/warehouseImport`,
        title: '库位导入',
        auth: ['hidden']
    }, {
        path: `/childPage/materialAdd`,
        title: '物料新增',
        auth: ['hidden']
    }, {
        path: `/childPage/materialDetail`,
        title: '物料详细',
        auth: ['hidden']
    }, {
        path: `/childPage/materialEdit`,
        title: '物料编辑',
        auth: ['hidden']
    }
]

let videoManage = [
    {
        path: `/videoD/addVideo`,
        title: '视频添加',
        auth: ['hidden']
    }, {
        path: `/videoD/editVideo`,
        title: '视频编辑',
        auth: ['hidden']
    }, {
        path: `/videoD/checkVideo`,
        title: '视频详情',
        auth: ['hidden']
    }
]

export default function createRoutes(item) {
    let arr = item
    const parent = arr.filter(item => item.parentId == 0)
    const len = parent.length
    arr.forEach(item => {
        if (item.parentId == 0) return
        for (let i = 0; i < len; i++) {
            if (item.parentId == parent[i].id) {
                if (!parent[i].children) parent[i].children = []
                parent[i].children.push(item)
                if(parent[i].title == '基础管理') {
                    for(let j = 0; j < basic.length; j ++) {
                        parent[i].children.push(basic[j])
                    }
                } else if (parent[i].title == '系统管理') {
                    for(let j = 0; j < system.length; j ++) {
                        parent[i].children.push(system[j])
                    }
                } else if(parent[i].title == '数据质量'){
                    for(let j = 0; j < dataQuality.length; j ++) {
                        parent[i].children.push(dataQuality[j])
                    }
                } else if(parent[i].title == '数据管理'){
                    for(let j = 0; j < dataManage.length; j ++) {
                        parent[i].children.push(dataManage[j])
                    }
                } else if(parent[i].title == '设备管理'){
                    for(let j = 0; j < deviceManage.length; j ++) { 
                        parent[i].children.push(deviceManage[j])
                    }
                } else if(parent[i].title == '维修管理'){
                    for(let j = 0; j < serviceManage.length; j ++) { 
                        parent[i].children.push(serviceManage[j])
                    }
                } else if(parent[i].title == '库存管理') {
                    for(let j = 0; j < storeManage.length; j ++) { 
                        parent[i].children.push(storeManage[j])
                    }
                } else if(parent[i].title == '视频管理') {
                    for(let j = 0; j < videoManage.length; j ++) {
                        parent[i].children.push(videoManage[j])
                    }
                }
                break
            }
        }
    })
    return parent;
}