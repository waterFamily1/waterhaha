//格式化utc时间
export function formatTime(time, format) {
    var t = new Date(time);
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

//判断数组中元素是否都相同
export function isAllEqual(array) {
    if (array.length > 0) {
        return !array.some(function(value, index) {
            return value !== array[0];
        });
    } else {
        return true;
    }
}

//设备类型tree

export function typeTreeMethod(data, busId) {
    const tree = []
    let temp
    data.forEach((item, i) => {
        if (item.parentId == busId) {
            tree.push(item)
            const copy = data.slice()
            copy.splice(i, 1)
            item.children = typeTreeMethod(copy, item.id)
        }
    })
    return tree
}

//设备状态=>设备类型

export function typeTreeMethod1(data, parentId) {
    const tree = []
    let temp
    data.forEach((item, i) => {
        if (item.parentId == parentId) {
            tree.push(item)
            const copy = data.slice()
            copy.splice(i, 1)
            item.children = typeTreeMethod1(copy, item.id)
        }
    })
    return tree
}