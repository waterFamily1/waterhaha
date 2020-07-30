const pre = '/basicsManage/';

export default {
    path: '/basicsManage',
    title: '基础管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-jichuxinxi',
    children: [
        {
            path: `${pre}tissueInfor`,
            title: '组织信息'
        }, {
            path: `${pre}userInfor`,
            title: '用户信息'
        }, {
            path: `${pre}areaSiteInfor`,
            title: '区域位置信息'
        }, {
            path: `${pre}deviceKindInfor`,
            title: '设备类型信息'
        }, {
            path: `${pre}user/checkUserInfor`,
            title: '用户详情',
            auth: ['hidden']
        }
    ]
}
