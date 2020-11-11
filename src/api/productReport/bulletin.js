import request from '@/plugins/request';

// 获取名称结构数据
export function getTree() {
    return request({
        url: 'loong/api/datainput-reports/tree',
        method: 'get'
    })
}
// 获取详情

export function getDetail(data) {
    return request({
        url: 'loong/api/datainput-forms/'+data,
        method: 'get'
    })
}

// 根据日期查询 

export function getTable(formId,date,cycleId) {
    return request({
        url: 'loong/api/datainput-records/data?formId='+formId+'&recordDate='+date+'T16:00:00.000Z&cycleId='+cycleId,
        method: 'get'
    })
}

//  导出表格 http://localhost:8080/loong/api/datainput-reports/export?formId=5&recordDate=2020-11-05T16%3A00%3A00.000Z&cycleId=W

export function exportTable(formId,recordDate,cycleId) {
    return request({
        url: 'loong/api/datainput-reports/export?formId='+formId+'&recordDate='+recordDate+'T16:00:00.000Z&cycleId='+cycleId,
        method: 'get',
    })
}