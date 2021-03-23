import request from '@/plugins/request';

//获取列表
export function getListMethod(data) {
    return request({
        url: '/loong/api/mpoints?queryName='+data.queryName+'&datype='+data.datype+'&datasource='+data.datasource+'&categoryId='+data.categoryId+'&pageSize='+data.pageSize+'&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//数据分类
export function dataKindMethod() {
    return request({
        url: '/loong/api/mpoints-datacategory',
        method: 'get'
    })
}

//删除选中测点
export function deleteMethod(data) {
    return request({
        url: '/loong/api/mpoints?ids='+data,
        method: 'DELETE'
    })
}

//批量配置
export function batchMethod(data) {
    return request({
        url: '/loong/api/mpoints/batch',
        method: 'PUT',
        data
    })
}

//权限
export function limitMethod() {
    return request({
        url: 'uaa/api/roles?currentPage=0&pageSize=10',
        method: 'get'
    })
}

//数据分类(自动采集测点详情)
export function dataKindTypeMethod(data) {
    return request({
        url: 'loong/api/mpoints-datacategory?mpointType='+data,
        method: 'get'
    })
}

//所属设备
export function belongEquMethod(data) {
    return request({
        url: '/equipment/api/equipments?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&processIds=-1',
        method: 'get'
    })
}

//导出测点
export function exportMethod(data) {
    return request({
        url: '/loong/api/mpoints/export?ids='+data,
        method: 'get'
    })
}

//区域位置
export function areaMethod() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//新增自动采集
export function add1(data) {
    return request({
        url: '/loong/api/mpoints-auto',
        method: 'post',
        data
    })
}

export function addMethod2(data) {
    return request({
        url: '/loong/api/mpoints-auto',
        method: 'put',
        data
    })
}

//新增人工
export function add2(data) {
    return request({
        url: 'loong/api/mpoints-datainput',
        method: 'post',
        data
    })
}

//单测点
//数据源测点
export function dataSiteMethod(data) {
    return request({
        url: '/loong/api/mpoints/dialog?filterId=&queryName'+data.queryName+'=&executeStatus=&siteId='+data.siteId+'&datasource=&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//计算周期
export function countCycleMethod() {
    return request({
        url: 'loong/api/mpoints-calc-cycle',
        method: 'get'
    })
}

//所属设备
export function fromEqu(data) {
    return request({
        url: '/equipment/api/equipments?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&processIds='+data.processIds+'',
        method: 'get'
    })
}


//计算方法
export function countMethod() {
    return request({
        url: 'loong/api/calc-formulas?type=Simple',
        method: 'get'
    })
}

//单测点保存
export function addSave(data) {
    return request({
        url: '/loong/api/mpoints-task',
        method: 'post',
        data
    })
}
export function addSave1(data) {
    return request({
        url: '/loong/api/mpoints-task',
        method: 'put',
        data
    })
}

//选择数据源测点以后
export function dataSitelaterMethod(data) {
    return request({
        url: '/loong/api/calc-tasks/origin-mpoint?type=Simple&mpointId='+data,
        method: 'get'
    })
}

//多测点计算方法
export function countMoreMethod() {
    return request({
        url: 'loong/api/calc-formulas?type=Complex',
        method: 'get'
    })
}

//查看(数据分析)
export function detailMethod(data) {
    return request({
        url: '/loong/api/mpoints-analysis/'+data,
        method: 'get'
    })
}

//查看(自动采集型测点)
export function detailMethod1(data) {
    return request({
        url: '/loong/api/mpoints-auto/'+data,
        method: 'get'
    })
}

//查看(多测点计算任务、单测点、自定义)
export function detailMethod2(data) {
    return request({
        url: '/loong/api/mpoints-calc/'+data,
        method: 'get'
    })
}
//查看(计算任务)
export function detailMethod4(data) {
    return request({
        url: '/loong/api/calc-tasks/target-mpoint?mpointId='+data,
        method: 'get'
    })
}
//查看(计算任务2)
export function detailMethod5(data) {
    return request({
        url: '/loong/api/calc-tasks/formula?formulaId='+data,
        method: 'get'
    })
}
//查看(计算任务3)
export function detailMethod6(data) {
    return request({
        url: '/loong/api/calc-parms?taskId='+data,
        method: 'get'
    })
}

//查看(人工录入)
export function detailMethod3(data) {
    return request({
        url: '/loong/api/mpoints-datainput/'+data,
        method: 'get'
    })
}

//编辑(人工录入)
export function editMethod(data) {
    return request({
        url: '/loong/api/mpoints-datainput/'+data,
        method: 'get'
    })
}

//导入
export function importMethod(data) {
    return request({
        url: '/loong/api/mpoints/import-save',
        method: 'post',
        data
    })
}