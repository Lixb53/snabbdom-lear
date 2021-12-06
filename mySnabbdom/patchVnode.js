import { htmlDomApi as api } from './htmldomapi'
import updateChildren from './updateChildren';
import { addVnodes } from './utils'
/**
 * @param {vnode} oldVnode 老的虚拟节点
 * @param {vnode} newVnode 新的虚拟节点
 * @returns
 */

export default function patchVnode(oldVnode, newVnode) {
    const elm = (newVnode.elm = oldVnode.elm)
    // 1. 判断是否是同一个对象
    if(oldVnode === newVnode) return;
    // 2. 判断newVnode上有没有text
    // 这里不考虑oldVnode的原因是, newVnode上存在text说明没有children
    if(newVnode.text && !newVnode.children) {
        // 判断新老虚拟节点的text是否相同
        if(oldVnode.text !== newVnode.text) {
            // 不相同就直接把newVnode中text 赋值给 真实elm的innerText(即使oldVnode有children,没有text属性, innerText一旦改变为新的text, 老的children直接消失)
            api.setTextContent(oldVnode.elm, newVnode.text)
        }
    } else {
        // 3. 判断oldVnode有children, 这个时候newVnode没有text, 有children
        if(oldVnode.children) {
            console.log('新旧虚拟节点都存在children')
            const elm = (newVnode.elm = oldVnode.elm)
            // 新旧节点都存在children
            updateChildren(elm, oldVnode.children, newVnode.children)
        } else {
            console.log('oldVnode上没有children, newVnode上有childrne')
            console.log(oldVnode)
            // oldVnode没有children, newVnode有children
            // 这个时候oldVnode只有text, 我们拿到newVnode的children
            // 先清空oldVnode的text
            if(oldVnode.text !== undefined) api.setTextContent(elm, '')

            // 遍历newVnode中的children
            let ch = newVnode.children
            addVnodes(elm, null, ch, 0, ch.length - 1)
        }
    }
}