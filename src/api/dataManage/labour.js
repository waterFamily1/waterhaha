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
export function dialog(filterId,queryName,siteId) {
    return request({
        url: '/loong/api/mpoints/dialog?filterId='+filterId+'&tag=datainput&queryName='+queryName+'&executeStatus=&siteId='+siteId+'&datasource=INPUT&pageSize=10&currentPage=1&inputFilter=1',
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
