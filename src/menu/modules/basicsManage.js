const pre = '/basic/';

export default {
    path: '/basic',
    title: '基础管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-jichuxinxi',
    children: [
        {
            path: `/basic/org`,
            title: '组织信息'
        }, {
            path: `/basic/user`,
            title: '用户信息'
        }, {
            path: `/basic/process`,
            title: '区域位置信息'
        }, {
            path: `/basic/equ`,
            title: '设备类型信息'
        }, {
            path: `/basic/user/checkUserInfor`,
            title: '用户详情',
            auth: ['hidden'] 
        }, {
            path: `/basic/user/editUserInfor`,
            title: '用户编辑',
            auth: ['hidden']
        }
    ]
}
