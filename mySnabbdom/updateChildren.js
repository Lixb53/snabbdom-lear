import patchVnode from "./patchVNode";
import sameVnode from "./sameVnode";
import { htmlDomApi as api } from './htmldomapi';
import { addVnodes, createKeyToOldIdx } from './utils';
import * as is from './is'
import createElm from "./createElm";

export default function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;

    while(newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        console.log('----进入diff----', oldCh, newCh)
        // 这里还得调用patchVnode
        // patchVnode和updateChildren是互相调用的关系
        // 指针走完后就不会再调用

        // 这一段是为了忽视我们加过 undefined 节点, 这些节点实际上已经移动了
        if(oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if(oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if(newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        } else if(newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        } 
        // 忽视了所有的undefined, 下面判断四种diff优化策略
        // 1. 旧前 和 新前
        else if(sameVnode(oldStartVnode, newStartVnode)) {
            console.log('1命中-旧前和新前-')
            // 调用patchVnode对比两个节点的 对象 文本 children
            patchVnode(oldStartVnode, newStartVnode)
            // 指针移动
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }
        // 2. 旧后 和 新后
        else if(sameVnode(oldEndVnode, newEndVnode)) {
            console.log('2命中-旧后和新后-')
            // 调用patchVnode对比两个节点的 对象 文本 children
            patchVnode(oldEndVnode, newEndVnode)
            // 指针移动
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        // 3. 旧前 和 新后
        else if(sameVnode(oldStartVnode, newEndVnode)) {
            console.log('3命中-旧前和新后-')
            // 调用patchVnode对比两个节点的 对象 文本 children
            patchVnode(oldStartVnode, newEndVnode)
            // 策略3是需要移动节点的, 把旧前节点 移动到 旧后之后
            api.insertBefore(
                parentElm,
                oldStartVnode.elm,
                api.nextSibling(oldEndVnode.elm)
            )
            // 指针移动
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }
        // 4. 旧后 和 新前
        else if(sameVnode(oldEndVnode, newStartVnode)) {
            console.log('4命中-旧后和新前-')
            // 调用patchVnode对比两个节点的 对象 文本 children
            patchVnode(oldEndVnode, newStartVnode)
            // 策略4也是需要移动节点的, 把 旧后节点 移动到 旧前之前
            api.insertBefore(
                parentElm,
                oldEndVnode.elm,
                oldStartVnode.elm
            )
            // 指针移动
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }
        // 如果4种策略都没命中
        else {
            console.log('四种diff优化策略都没命中')
            if(oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }

            // 拿到新前节点的记录
            idxInOld = oldKeyToIdx[newStartVnode.key]
            console.log(idxInOld,'是否存在缓存')
            // 判断当前项是否存在缓存中
            // 不存在
            if(is.unDef(idxInOld)) {
                // 不存在就是要新增
                // 添加的节点还是虚拟节点  要通过 createElm 进行创建dom
                // 同样添加到 旧前 之前
                console.log('添加新节点')
                api.insertBefore(
                    parentElm,
                    createElm(newStartVnode),
                    oldStartVnode.elm
                )
            } 
            // 存在
            else {
                // 存在的话, 就要移动节点
                // 从老节点 取出要移动的项
                elmToMove = oldCh[idxInOld]
                // 如果要移动的sel和新前的sel不同, 则调用createElm创建新前节点, 并移动到旧前之前, 因为旧前 与 旧后 之间的要被删除
                if(elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(
                        parentElm,
                        createElm(newStartVnode),
                        oldStartVnode.elm
                    )
                } else {
                    console.log(elmToMove, newStartVnode)
                    // 调用patchVnode进行对比, 修改
                    patchVnode(elmToMove, newStartVnode)
                    // 将这一项设为undefined
                    oldCh[idxInOld] = undefined
                    // 移动节点到旧前之前
                    api.insertBefore(
                        parentElm,
                        elmToMove.elm,
                        oldStartVnode.elm
                    )
                }
            }
            // 处理完添加和移动后, 将 新前 指针继续向下走
            newStartVnode = newCh[++newStartIdx]
        }

    }
    // 这一步, 添加和删除操作还没做
    // 首先完成添加操作
    // 新前 和 新后 中间是否还存在节点
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        // 如果old先于new完成循环, 则new里面还有剩余节点, 遍历添加
        if(oldStartIdx > oldEndIdx) {
            console.log('添加 新前 和 新后 中间还存在的节点')
            // before, 标识, 执行dom的插入操作时提供的标识
            before = newCh[newEndIdx + 1] == null
                ? null
                : newCh[newEndIdx +  1].elm
            addVnodes(
                parentElm,
                before,
                newCh,
                newStartIdx,
                newEndIdx
            )
        } else {
            // old里面还有剩余节点, 旧前 和 旧后 之间的节点需要删除
            console.log('删除 旧前 和 旧后 之间的节点')
            for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                // 删除剩余节之前, 先判断是否存在
                if(oldCh[i].elm) {
                    console.log(oldCh[i].elm)
                    parentElm.removeChild(oldCh[i].elm)
                }
            }
        }

    }
}
