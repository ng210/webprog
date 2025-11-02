function poll(action, timeout) {
    async function poll_(action, timeout, resolve, args) {
        clearTimeout(action.timer);
        var result = await action(...args);
        if (result) resolve(result);
        else action.timer = setTimeout(poll_, timeout, action, timeout, resolve, args);
    }

    var args_ = [];
    for (var i=2; i<arguments.length; i++) {
        args_.push(arguments [i]);
    }
    return new Promise(resolve => {
        poll_(action, timeout || 100, resolve, args_);
    });
};

function sleep(milliseconds) {
    var isFirst = true;
    return poll( () => {
        //var p = isFirst;
        isFirst = !isFirst;
        return isFirst;
    }, milliseconds);
}

var locks__ = {};
function lock(token, action) {
    if (locks__[token] == undefined) {
        locks__[token] = [0, 0];
    }
    return new Promise( resolve => {
        poll( function() {
            var request = locks__[token][0];
            if (request == locks__[token][1]) {
                locks__[token][0]++;
                if (locks__[token][0] == request + 1) {
                    debug_('locked: ' + locks__[token], 4);
                    return true;
                }
            }
            return false;
        }).then(async function() {
            await action();
            locks__[token][1] = locks__[token][0];
            resolve();
            debug_('unlocked: ' + locks__[token], 4);
        });
    });
};

function clone(obj) {
    var c = obj;
    if (obj != null && typeof obj === 'object') {
        if (typeof obj.constructor.clone === 'function') {
            c = obj.constructor.clone(obj);
        } else {
            switch (obj.constructor) {
                case Boolean: c = new Boolean(obj); break;
                case Number: c = new Number(obj); break;
                case String:c = new String(obj); break;
                case Array: c = Array.from(obj); break;
                case Date: c = new Date(obj); break;
                default:
                    c = Reflect.construct(obj.constructor, []);
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i) && typeof i !== 'function') {
                            c[i] = clone(obj[i]);
                        }
                    }
                    break;
            }
        }
    }
    return c;
};

function implement(cls, iface) {
    let descriptors = Object.getOwnPropertyDescriptors(iface.prototype);
    for (let k in descriptors) {
        let desc = descriptors[k];
        if (typeof desc.value === 'function') {
            if (desc.value != iface) {
                Object.defineProperty(cls, k, desc);
            }
        }
        if (desc.get != undefined) {
            Object.defineProperty(cls, k, desc);
        }
        if (desc.set != undefined) {
            Object.defineProperty(cls, k, desc);
        }
    }
};

// // flags
// // - common: non-common properties are not copied
// // - overwrite: common properties are overwritten from source
// // - new: create a new object instead of modifying destination
// function mergeObjects(src, dst, flags) {
//     var isSrc = src != undefined && src != null;
//     var isDst = dst != undefined && dst != null;
//     var res = null;
//     flags = flags || 0;
//     var isNew = (flags & mergeObjects.NEW) != 0;
//     var isOverwrite = (flags & mergeObjects.OVERWRITE) != 0;
//     var isExtend = (flags & mergeObjects.COMMON) == 0;

//     if (!isSrc && isDst) {
//         return isNew ? clone(dst) : dst;
//     } else if (!isSrc && !isDst) {
//         return null;
//     } else if (isSrc && !isDst) {
//         return  isNew ? clone(src) : src;
//     }

//     var isSrc = Array.isArray(src) || typeof src === 'object';
//     var isDst = Array.isArray(dst) || typeof dst === 'object';

//     if (isSrc && isDst) {
//         var srcAttribs = Object.keys(src);
//         var dstAttribs = Object.keys(dst);

//         res = isNew ? Reflect.construct(dst.constructor, []) : dst;

//         for (var i=0; i<dstAttribs.length; i++) {
//             var attr = dstAttribs[i];
//             var isCommon = srcAttribs.includes(attr);
//             var value = dst[attr];
//             var attr2 = attr;
//             if (isCommon) {
//                 if (isOverwrite) {
//                     value = mergeObjects(src[attr], dst[attr], mergeObjects.OVERWRITE | mergeObjects.NEW);
//                 } else if (isExtend) {
//                     var attr2 = Array.isArray(res) ? res.length : attr + '2';
//                     value = clone(src[attr]);
//                     //res[attr2] = clone(src[attr]);
//                 }
//             } else if (isNew) value = clone(value);

//             //res[attr2] = Array.isArray(value) || typeof value === 'object' ? mergeObjects(value);
//             res[attr2] = value;
//             //if (isNew) res[attr] = clone(dst[attr]);
//         }

//         if (isExtend) {
//             for (var i=0; i<srcAttribs.length; i++) {
//                 var attr = srcAttribs[i];
//                 var isCommon = dstAttribs.includes(attr);
//                 if (!isCommon) {
//                     Array.isArray(res) ? res.push(clone(src[attr])) : res[attr] = clone(src[attr]);
//                 }
//             }
//         }
//     } else if (!isSrc && !isDst) {
//         res = isOverwrite ? src : dst;
//     } else {
//         throw new Error('Type mismatch!');
//     }

//     return res;
// }

// mergeObjects.COMMON = 1;
// mergeObjects.OVERWRITE = 2;
// mergeObjects.NEW = 4;
// mergeObjects.DEFAULT = 4;

// function getCommonParent(obj1, obj2, parentAttributeName) {
//     var p1 = obj1;
//     var p2 = obj2;
//     var path1 = [];
//     var res = null;
//     while (p1 != null) {
//         path1.push(p1);
//         p1 = p1[parentAttributeName];
//     }
//     while (p2 != null) {
//         if (path1.includes(p2)) {
//             res = p2;
//             break;
//         }
//         p2 = p2[parentAttributeName];
//     }
//     return res;
// }

// function getObjectPath(obj, parentAttributeName, ancestor) {
//     var res = [];
//     ancestor = ancestor || self;
//     while (obj != null) {
//         res.unshift(obj);
//         if (obj == ancestor) break;
//         obj = obj[parentAttributeName];
//     }
//     return res;
// }

// function getObjectAt(path, obj) {
//     obj = obj || self;
//     var i = 0;
//     var tokens = path.split('.');
//     for (; i<tokens.length-1; i++) {
//         obj = obj[tokens[i]];
//         if (!obj) break;
//     }
//     if (obj) obj = obj[tokens[i]];
//     return obj;
// }

// function setObjectAt(path, obj, value) {
//     var oldValue;
//     obj = obj || self;
//     var i = 0;
//     var tokens = path.split('.');
//     var field = tokens.pop();
//     for (; i<tokens.length; i++) {
//         obj = obj[tokens[i]];
//         if (!obj) break;
//     }
//     if (obj) {
//         oldValue = obj[field];
//         obj[field] = value;
//     }
//     return oldValue;
// }

// function stringify(o, space) {
//     return JSON.stringify(o, (key, value) => {
//         if (value instanceof Map) {
//             var obj = {};
//             for (var [k, v] of value) {
//                 obj[k] = v != null && v.valueOf ? v.valueOf() : v;
//             }
//             value = obj;
//         }
//         return value != null && value.valueOf ? value.valueOf() : value;
//     },
//     space);
// }

export { poll, sleep, lock, clone, implement };