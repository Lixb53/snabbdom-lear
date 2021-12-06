export const array = Array.isArray

export function primitive(s) {
    return typeof s === 'string' ||
        typeof s === 'number' ||
        s instanceof String ||
        s instanceof Number;
} 

export function unDef(s) {
    return s === undefined
}

export function Def(s) {
    return s !== undefined
}