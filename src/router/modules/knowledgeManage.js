import BasicLayout from '@/layouts/basic-layout'
const pre = 'knowledge-'

const meta = {
    auth: false
}

export default {
    path: '/knowledge',
    title: '知识管理',
    custom: 'icon iconfont i-icon-demo icon-zhishi',
    redirect: {
        name: `${pre}knowledge-overview`
    },
    component: BasicLayout,
    meta,
    children: [
        {
            path: '/knowledge/overview',
            name: `${pre}knowledge-overview`,
            meta: {
                ...meta,
                title: '知识总览',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/knowledgeOverview')
        }, {
            path: '/knowledge/doc',
            name: `${pre}knowledge-doc`,
            meta: {
                ...meta,
                title: '文档管理',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/documentManage')
        }, {
            path: '/knowledge/label',
            name: `${pre}knowledge-label`,
            meta: {
                ...meta,
                title: '标签管理',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/tagManage')
        }, {
            path: '/knowledge/personal',
            name: `${pre}knowledge-personal`,
            meta: {
                ...meta,
                title: '我的知识',
                closable: false
            },
            component: () => import('@/pages/knowledgeManage/myKnowledge')
        }
    ]
}
