//获取组织结构
export default function createTree(data, parentId) {
    const tree = []
    let temp
    data.forEach((item, i)=> {
        if(item.parentId == parentId) {
            tree.push(item)
            const copy = data.slice()
            copy.splice(i, 1)
            item.children = createTree(copy, item.id)
        }
    })
    return tree
}