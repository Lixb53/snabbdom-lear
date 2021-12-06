import vNode from './vNode';
import * as is from './is';

/**
 * 
 * @param {string} sel 选择器
 * @param {object} b class、id，dataset。。。
 * @param {any} c 文本、数组
 */
export default function(sel, b, c) {
    // 先判断是否有3个参数
    if(arguments.length < 3) throw new Error('请检查参数个数')

    let data,
        text,
        children;
        

    if(b !== null) {
        data = b
    }
        
    // 第三个参数具有不确定性, 先进行判断
    // 1. 第三个参数是文本节点
    if(is.primitive(c)) {
        text = c.toString()
    } else if(is.array(c)) {
        children = c
    } else if(c && c.sel) {
        children = [c]
    }

    // 如果children !== undefined
    // 循环遍历children, 目的是把children中不是h()的  通过vNode转换一下
    if(children !== undefined && children.length > 0) {
        for(let i = 0; i < children.length; i++) {
            if(is.primitive(children[i])) {
                children[i] = vNode(
                    undefined,
                    undefined,
                    undefined,
                    children[i],
                    undefined
                )
            }
        }
    }

    return vNode(sel, b, children, text, undefined)
}