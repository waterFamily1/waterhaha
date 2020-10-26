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
        path: '/task-detail',
        title: '查看多测点计算任务',
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
                }
                break
            }
        }
    })
    return parent;
}