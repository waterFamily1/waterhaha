import BasicLayout from '@/layouts/basic-layout'
const pre = 'knowledgeManage-'

const meta = {
    auth: false
}

export default {
    path: '/knowledgeManage',
    title: '知识管理',
    custom: 'icon iconfont i-icon-demo icon-zhishi',
    redirect: {
        name: `${pre}knowledgeOverview`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: 'knowledgeOverview',
            name: `${pre}knowledgeOverview`,
            meta: {
                ...meta,
                title: '知识总览',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/knowledgeOverview')
        }, {
            path: 'documentManage',
            name: `${pre}documentManage`,
            meta: {
                ...meta,
                title: '文档管理',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/documentManage')
        }, {
            path: 'tagManage',
            name: `${pre}tagManage`,
            meta: {
                ...meta,
                title: '标签管理',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/tagManage')
        }, {
            path: 'myKnowledge',
            name: `${pre}myKnowledge`,
            meta: {
                ...meta,
                title: '我的知识',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/myKnowledge')
        }
    ]
}
