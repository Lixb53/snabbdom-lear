import h from '../mySnabbdom/h'
import patch from '../mySnabbdom/patch'

const container = document.getElementById('container');

const vnode = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E')
])

const vnode2 = h('ul', {}, [
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'A' }, 'A')
])

const vnode3 = h('ul', {}, [
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'K' }, 'K'),
])

const vnode4 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
])

const vnode5 = h('ul', {}, [
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'V' }, 'V'),
])

const vnode6 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h(
        'li',
        { key: 'E' },
        h('ul', {}, [
            h('li', { key: 'A' }, 'A'),
            h('li', { key: 'B' }, 'B'),
            h('li', { key: 'C' }, 'C'),
            h('li', { key: 'D' }, 'D'),
            h('li', { key: 'E' }, h('div', { key: 'R' }, 'R')),
        ])
    ),
])

patch(container, vnode)

let vnodeList = [vnode2, vnode3, vnode4, vnode5, vnode6]
const btns = document.getElementsByClassName('btns');
console.log(btns)
btns[0].addEventListener('click', (e) =>  {
    if(e.target.tagName !== 'BUTTON') return;
    let idx = e.target.dataset.idx
    patch(vnode, vnodeList[idx])
})