import { htmlDomApi as api } from './htmldomapi'
import createElm from './createElm'

/**
 * 插入节点
 * @param {node} parentElm 
 * @param {node | null} before 
 * @param {array} vnodes 
 * @param {number} startIdx 
 * @param {number} endIdx 
 * @returns
 */
export function addVnodes(
    parentElm, 
    before, 
    vnodes, 
    startIdx, 
    endIdx
) {
    for(; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx]
        console.log(ch)
        if(ch != null) {
            api.insertBefore(parentElm, createElm(ch), before)
        }
    }
} 

/**
 * 创建缓存对象, 这样就不用每次都遍历老对象
 * @param {Array} children 
 * @param {Number} beginIdx 
 * @param {Number} endIdx 
 */
export function createKeyToOldIdx(
    children,
    beginIdx,
    endIdx
) {
    const map = {}
    for(let i = beginIdx; i <= endIdx; ++i) {
        const key = children[i].key;
        if(key !== undefined) {
            map[key] = i
        }
    }
    return map
}