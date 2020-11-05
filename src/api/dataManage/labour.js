import request from '@/plugins/request';

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}
// 获取数据
// type=hour&siteId=&queryName=&beginDate=&endDate=&pageSize=10&currentPage=1&siteName=%E8%AF%B7%E9%80%89%E6%8B%A9&cycleId=
export function getTable(siteId,queryName,begin,end,page,siteName) {
    return request({
        url: '/loong/api/datainput-forms?type=hour&siteId='+siteId+'&queryName='+queryName+'&beginDate='+begin+'&endDate='+end+'&pageSize=10&currentPage='+page+'&siteName='+siteName+'&cycleId=',
        method: 'get'
    })
}
// 新增模态数据
// loong/api/mpoints/dialog?filterId=&tag=datainput&queryName=&executeStatus=&datasource=INPUT&pageSize=10&currentPage=1&inputFilter=1
// loong/api/mpoints/dialog?filterId=&tag=datainput&queryName=&executeStatus=&siteId=1&datasource=INPUT&pageSize=10&currentPage=1&inputFilter=1
export function dialog(filterId,queryName,siteId,page) {
    return request({
        url: '/loong/api/mpoints/dialog?filterId='+filterId+'&tag=datainput&queryName='+queryName+'&executeStatus=&siteId='+siteId+'&datasource=INPUT&pageSize=10&currentPage='+page+'&inputFilter=1',
        method: 'get'
    })
}
// 新增  loong/api/datainput-forms
export function addLabour(data) {
    return request({
        url: '/loong/api/datainput-forms',
        method: 'post',
        data
    })
}

// 删除 
export function deleteLabour(data) {
    return request({
        url: '/loong/api/datainput-forms?ids='+data,
        method: 'DELETE'
    })
}

// 查看表单  loong/api/datainput-forms/17
export function checkForm(data) {
    return request({
        url: 'loong/api/datainput-forms/'+data,
    })
}

// 编辑 loong/api/datainput-forms
export function editLabour(data) {
    return request({
        url: '/loong/api/datainput-forms',
        method: 'PUT',
        data
    })
}
// 查看数据 loong/api/datainput-records/data?formId=17&recordDate=2020-10-27T16:00:00.000Z&cycleId=4H
export function recordData(formId,recordDate,cycleId) {
    return request({
        url: '/loong/api/datainput-records/data?formId='+formId+'&recordDate='+recordDate+'T16:00:00.000Z&cycleId='+cycleId,
        method: 'get',
    })
}

// 录入数据保存 loong/api/datainput-records/data
export function logSave(data) {
    return request({
        url: '/loong/api/datainput-records/data',
        method: 'POST',
        data
    })
}
// 查看记录 /loong/api/datainput-records?queryName=&formId=17&pageSize=10&currentPage=1
export function checkRecord(formId,queryName,page) {
    return request({
        url: '/loong/api/datainput-records?queryName='+queryName+'&formId='+formId+'&pageSize=10&currentPage='+page,
        method: 'get',
    })
}
// 删除记录  
export function deleteRecord(data) {
    return request({
        url: '/loong/api/datainput-records?ids='+data,
        method: 'DELETE'
    })
}
// 根据时间查记录  loong/api/datainput-records?queryName=&formId=17&pageSize=10&currentPage=1&beginDate=2020-10-20T16:00:00.000Z&endDate=
export function recordByTime(formId,queryName,page,begin,end) {
    return request({
        url: '/loong/api/datainput-records?queryName='+queryName+'&formId='+formId+'&pageSize=10&currentPage='+page+'&beginDate='+begin+'&endDate='+end,
        method: 'get',
    })
}