/**
 * 把传入的 参数 作为 对象 返回
 * @param { string } sel 选择器
 * @param { object } data 数据(class, id等等)
 * @param { Array } children 子节点
 * @param { string } text 文本
 * @param { dom } elm DOM
 * @returns object
 */

export default function vNode(sel, data, children, text, elm) {
    let key = data === undefined ? undefined : data.key
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}