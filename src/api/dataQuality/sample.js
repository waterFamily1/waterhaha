import request from '@/plugins/request';

//获取数据分类
export function datacategory () {
    return request({
        url: '/loong/api/mpoints-datacategory'
    })
}
// 获取表格数据
export function searchData (queryName,dataType,categoryId,page,siteId,siteName) {
    return request({
        url: '/loong/api/data-quality/config?queryName='+queryName+'&datype='+dataType+'&categoryId='+categoryId+'&pageSize=10&currentPage='+page+'&siteId='+siteId+'&siteName='+siteName

    })
}


// 获取模态表格数据
export function modelData (queryName,siteId,page,confDataQuality,datasource) {
    return request({
        url: '/loong/api/mpoints/dialog?queryName='+queryName+'&siteId='+siteId+'&currentPage='+page+'&pageSize=10&confDataQuality='+confDataQuality+'&datasource='+datasource
    })
}
// 按条件获取表格数据
export function tableData (queryName,dataType,categoryId,page) {
    return request({
        url: '/loong/api/data-quality/config?queryName='+queryName+'&datype='+dataType+'&categoryId='+categoryId+'&pageSize=10&currentPage='+page
    })
}

//区域位置结构
export function regionalCon () {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

// 添加样本

export function addSample (data) {
    return request({
        url: '/loong/api/data-quality/config',
        method: 'post',
        data
    })
}

// 删除样本

export function deleteSample (data) {
    return request({
        url: '/loong/api/data-quality/config?ids='+data,
        method: 'delete',
    })
}

//测点更换获取表格数据  
export function changeTableData (queryName,page,confDataQuality,datasource) {
    return request({
        url: '/loong/api/mpoints/dialog?queryName='+queryName+'&currentPage='+page+'&pageSize=10&confDataQuality='+confDataQuality+'&datasource='+datasource
    })
}