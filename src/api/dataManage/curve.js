import request from '@/plugins/request';

//数据组合
export function dataGroupMethod() {
    return request({
        url: '/loong/api/curve-combines',
        method: 'get'
    })
}

//数据组合列表
export function dataListMethod(data) {
    return request({
        url: '/loong/api/mpoints/dialog?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&siteId='+data.siteId+'',
        method: 'get'
    })
}

//添加数据组合
export function addDataMethod(data) {
    return request({
        url: '/loong/api/curve-combines',
        method: 'post',
        data
    })
}

//删除单数据
export function deleteDataMethod(data) {
    return request({
        url: '/loong/api/curve-combines?ids='+data,
        method: 'DELETE'
    })
}

//编辑单数据
export function editeDataMethod(data) {
    return request({
        url: '/loong/api/curve-combines?ids='+data,
        method: 'PUT'
    })
}

//单数据
export function singleDataMethod() {
    return request({
        url: '/loong/api/curves/tree',
        method: 'get'
    })
}

//单数据添加children
export function addSingleChildMethod(data) {
    return request({
        url: '/loong/api/curves/child?siteId='+data,
        method: 'get'
    })
}

//单数据list
export function singleListMethod(data) {
    return request({
        url: '/loong/api/mpoints/dialog?queryName='+data.queryName+'&siteId='+data.siteId+'&currentPage='+data.currentPage+'&pageSize=10&isCurve=true',
        method: 'get'
    })
}

//添加单数据
export function addSingleDataMethod(data) {
    return request({
        url: '/loong/api/curves',
        method: 'post',
        data
    })
}

//删除单数据
export function deleteSingleMethod(data) {
    return request({
        url:'/loong/api/curves?mpointIds='+data,
        method: 'DELETE'
    })
}

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//检索组合、测点
export function searchMethod(data) {
    return request({
        url: '/loong/api/curves-and-combine?queryName='+data,
        method: 'get'
    })
}

//选择曲线模板
export function changeCurverMethod(data) {
    return request({
        url: 'loong/api/curve-modules?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}

//选择
export function sureChangeCurveMethod(data) {
    return request({
        url: '/loong/api/curve-modules/copy',
        method: 'post',
        data
    })
}

//删除
export function deleteChangeCurveMethod(data) {
    return request({
        url: '/loong/api/curve-modules?id='+data,
        method: 'DELETE'
    })
}

//保存模板
export function saveCurveMethod(data) {
    return request({
        url: '/loong/api/curve-modules',
        method: 'post',
        data
    })
}

//保存测点组合
export function saveGroupMethod(data) {
    return request({
        url: '/loong/api/curve-combines',
        method: 'post',
        data
    })
}

//测点highcharts
export function chartMethod(data) {
    return request({
        url: '/loong/api/curves/data?ids='+data.ids+'&beginDate='+data.beginDate+'&cycle=day&ring=0&year=0',
        method: 'get'
    })
}