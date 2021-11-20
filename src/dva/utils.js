//给action type 增加命名空间前缀 （因为reducers、effects...需要用到此函数，所以独立出来）
export function prefix(obj,namespace) {
    let newObj = {}
    for(let key in obj) {
        newObj[namespace+'/'+key] = obj[key]
    }
    return newObj
}