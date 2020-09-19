const pre = '/knowledgeManage/';

export default {
    path: '/knowledgeManage',
    title: '知识管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zhishi',
    children: [
        {
            path: `/knowledge/overview`,
            title: '知识总览'
        }, {
            path: `/knowledge/doc`,
            title: '文档管理'
        }, {
            path: `/knowledge/label`,
            title: '标签管理'
        }, {
            path: `/knowledge/personal`,
            title: '我的知识'
        }
    ]
}
