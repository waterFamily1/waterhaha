const pre = '/videoManage/';

export default {
    path: '/videoManage',
    title: '视频管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-shipinzixun',
    children: [
        {
            path: `${pre}RTVideo`,
            title: '实时视频'
        }, {
            path: `${pre}videoCapture`,
            title: '视频抓拍'
        }, {
            path: `${pre}videoDeploy`,
            title: '视频配置'
        }
    ]
}
