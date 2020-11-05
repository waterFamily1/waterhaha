import request from '@/plugins/request';

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}
// loong/api/datainput-forms?type=day&siteId=&queryName=&beginDate=&endDate=&pageSize=10&currentPage=1&siteName=%E8%AF%B7%E9%80%89%E6%8B%A9&cycleId=
export function getTable(siteId,queryName,begin,end,page,siteName,cycleId) {
    return request({
        url: '/loong/api/datainput-forms?type=day&siteId='+siteId+'&queryName='+queryName+'&beginDate='+begin+'&endDate='+end+'&pageSize=10&currentPage='+page+'&siteName='+siteName+'&cycleId='+cycleId,
        method: 'get'
    })
}
// http://web.tjdeht.cn:8801/loong/api/mpoints/dialog?filterId=&tag=datainput&queryName=&executeStatus=&datasource=INPUT&pageSize=10&currentPage=1&inputFilter=1
// 新增模态数据
export function dialog(filterId,queryName,siteId,page) {
    return request({
        url: '/loong/api/mpoints/dialog?filterId='+filterId+'&tag=datainput&queryName='+queryName+'&executeStatus=&siteId='+siteId+'&datasource=INPUT&pageSize=10&currentPage='+page+'&inputFilter=1' ,
        method: 'get'
    })
}

// 新增  loong/api/datainput-forms
export function addBulletin(data) {
    return request({
        url: '/loong/api/datainput-forms',
        method: 'post',
        data
    })
}
// loong/api/datainput-forms
// 删除 
export function deleteBulletin(data) {
    return request({
        url: '/loong/api/datainput-forms?ids='+data,
        method: 'DELETE'
    })
}

//查看数据 loong/api/datainput-records/data?formId=5&recordDate=2020-10-20T16:00:00Z&cycleId=W
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
