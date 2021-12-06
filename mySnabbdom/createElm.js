import * as is from './is'
import {htmlDomApi as api} from './htmldomapi'

/**
 * 创建元素
 * @param {vnode} vnode 要创建的节点
 */

export default function createElm(vnode) {

    // 如果没有标签, 则是纯文本节点
    if(vnode.sel !== undefined) {
        // 创建真实dom
        const elm = vnode.elm = api.createElement(vnode.sel, vnode.data)
        // 存在子节点
        // 子节点是文本
        if(is.primitive(vnode.text)) {
            // 直接添加文本到 elm 中
            api.appendChild(elm, api.createTextNode(vnode.text))
        }
        // 子节点是数组 
        else if(is.array(vnode.children) && (vnode.children && vnode.children.length > 0)){
            let children = vnode.children
            for(let i = 0; i < children.length; i++) {
                // 获取到每一个数组中的 子节点
                let ch = children[i]
                if(ch != null) {
                    // 递归的方式 创建节点 并 把子节点添加到 自己身上
                    api.appendChild(elm, createElm(ch))
                }
            }
        }
    } else {
        vnode.elm = api.createTextNode(vnode.text)
    }

    return vnode.elm
}