import vNode from "./vNode"
import sameVnode from './sameVnode'
import createElm from './createElm'
import { htmlDomApi as api } from './htmldomapi'
import patchVnode from "./patchVNode"

/**
 * @param { vnode | dom } oldVnode
 * @param { vnode } newVnode
 */



export default function patch(oldVnode, newVnode) {
    // 1. 判断oldVnode是不是虚拟节点
    if(!oldVnode.sel) {
        oldVnode = emptyNodeAt(oldVnode)
    }

    if(sameVnode(oldVnode, newVnode)) {
        console.log('新旧虚拟节点是同一个节点')
        // 是同一个虚拟节点, 调用patchVnode方法
        patchVnode(oldVnode, newVnode)

    } else {
        // 不是同一个虚拟节点, 暴力插入新的, 删除旧的
        let elm = oldVnode.elm,
            parent = api.parentNode(elm);
        
        createElm(newVnode)
        if(parent !== null) {
            api.insertBefore(parent, newVnode.elm, api.nextSibling(elm))

            api.removeChild(parent, oldVnode.elm)
        }
    }

    // 返回newVnode作为 旧的虚拟节点
    return newVnode
}

/**
 * 
 * @param {DOM} elm DOM节点
 * @returns {object}
 */
function emptyNodeAt(elm) {
    // 把sel和elm传入vnode并返回
    // 这里主要把elm的tagname给转成小写
    // 这里比较简陋, 没有处理 # 和 .
    // data也可以传递class和id
    let sel = elm.tagName.toLowerCase()
    return vNode(sel, undefined, undefined, undefined, elm)
}