//遍历返回路由

let basic = [
    {
        path: `/user/checkUserInfor`,
        title: '用户详情',
        auth: ['hidden'] 
    }, {
        path: `/user/editUserInfor`,
        title: '用户编辑',
        auth: ['hidden']
    }, {
        path: `/user/addUserInfor`,
        title: '新增用户',
        auth: ['hidden']
    }
]

export default function createRoutes(item) {
    let arr = item
    const parent = arr.filter(item => item.parentId == 0)
    const len = parent.length
    arr.forEach(item => {
        if (item.parentId == 0) return
        for (let i = 0; i < len; i++) {
            if (item.parentId == parent[i].id) {
                if (!parent[i].children) parent[i].children = []
                parent[i].children.push(item)
                if(parent[i].title == '基础管理') {
                    for(let j = 0; j < basic.length; j ++) {
                        parent[i].children.push(basic[j])
                    }
                }
                break
            }
        }
    })
    return parent;
}