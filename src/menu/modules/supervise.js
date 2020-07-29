const pre = '/supervise/';

export default {
    path: '/supervise',
    title: '实时监管',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-jianguan',
    children: [
        {
            path: `${pre}controlCenter`,
            title: '调度中心'
        }, {
            path: `${pre}monitorScreen`,
            title: '监视画面'
        }, {
            path: `${pre}screenProfile`,
            title: '监视画面配置'
        }, {
            path: `${pre}screenProfile3D`,
            title: '监视画面配置3D'
        }
    ]
}
