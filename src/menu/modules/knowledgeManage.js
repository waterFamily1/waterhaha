const pre = '/knowledgeManage/';

export default {
    path: '/knowledgeManage',
    title: '知识管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-zhishi',
    children: [
        {
            path: `${pre}knowledgeOverview`,
            title: '知识总览'
        }, {
            path: `${pre}documentManage`,
            title: '文档管理'
        }, {
            path: `${pre}tagManage`,
            title: '标签管理'
        }, {
            path: `${pre}myKnowledge`,
            title: '我的知识'
        }
    ]
}
