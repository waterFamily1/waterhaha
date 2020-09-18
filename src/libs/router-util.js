//遍历返回路由

export default function createRoutes(item) {
    let arr = item.data
    const parent = arr.filter(item => item.parentId == 0)
    console.log(parent)
    const len = parent.length
    arr.forEach(item => {
        if (item.parentId == 0) return
        for (let i = 0; i < len; i++) {
            if (item.parentId == parent[i].id) {
                if (!parent[i].children) parent[i].children = []
                parent[i].children.push(item)
                break
            }
        }
    })
}