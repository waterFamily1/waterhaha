//筛选业务名称tree
export default function createNameTree(item) {
    let arr = item
    const parent = arr.filter(item => item.parentId == 0)
    const len = parent.length
    arr.forEach(item => {
        if (item.parentId == 0) {
            return
        }
        for (let i = 0; i < len; i++) {
            if (item.parentId == parent[i].id) {
                if (!parent[i].children) parent[i].children = []
                parent[i].children.push(item)
                break
            }
        }
    })
    return parent;
}