/**
 * 判断两个虚拟节点是否是同一节点
 * @param {vnode} vnode1 旧的虚拟节点
 * @param {vnode} vnode2 新的虚拟节点
 * @returns boolean
 */

export default function sameVnode(vnode1, vnode2) {
    const isSameKey = vnode1.key === vnode2.key
    const isSameSel = vnode1.sel === vnode2.sel

    return isSameKey && isSameSel
}