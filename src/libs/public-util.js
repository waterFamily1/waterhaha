//获取组织结构
export default function createTree(item) {
    let arr = item
    const parent = arr.filter(item => item.parentId == 0)
    const len = parent.length
    arr.forEach(item => {
        if (item.parentId == 0) {
            return
        }
        for (let i = 0; i < len; i++) {
            if (item.idPath == parent[i].idPath+parent[i].id+',') {
                if (!parent[i].children) parent[i].children = []
                parent[i].children.push(item)
                break
            }
            for(let j = 0; j < parent[i].children.length; j ++) {
                if(item.idPath == parent[i].children[j].idPath+parent[i].children[j].id+',') {
                    if (!parent[i].children[j].children) parent[i].children[j].children = []
                    parent[i].children[j].children.push(item)
                    break
                }
            }
        }
    })
    return parent;
}