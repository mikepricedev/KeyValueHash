"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyNode_1 = require("./KeyNode");
const RootKeyNode_1 = require("./RootKeyNode");
const Path_1 = require("./Path");
const entries = function* (obj) {
    if (Array.isArray(obj)) {
        yield* obj.entries();
    }
    else {
        const hasOwnProp = Object.prototype.hasOwnProperty.bind(obj);
        const isEnumerable = Object.prototype.propertyIsEnumerable.bind(obj);
        for (let key in obj) {
            if (hasOwnProp(key) && isEnumerable(key)) {
                yield [key, obj[key]];
            }
        }
    }
};
const fromKeyNodeToRootKey = function* (keyNode) {
    yield keyNode;
    yield* keyNode.parents();
};
const KEY_VALUE_MAP = Symbol();
const ROOT_KEYS = Symbol();
const SRC_OBJECT = Symbol();
const INDEX_WILDCARD = Symbol();
class KeyValueHash {
    constructor(objToHash) {
        const keyValueMap = new Map();
        const rootKeys = new Set();
        //Root Keys
        for (const [k, val] of entries(objToHash)) {
            const rootKey = new RootKeyNode_1.default(k.toString(), rootKeys);
            keyValueMap.set(rootKey, val);
        }
        for (const [pKey, pKeyVal] of keyValueMap) {
            if (typeof pKeyVal === 'object' && pKeyVal !== null) {
                for (const [k, val] of entries(pKeyVal)) {
                    const key = new KeyNode_1.default(k.toString(), pKey);
                    keyValueMap.set(key, val);
                }
            }
        }
        this[KEY_VALUE_MAP] = keyValueMap;
        this[ROOT_KEYS] = rootKeys;
        this[SRC_OBJECT] = objToHash;
    }
    //Accessors
    get size() {
        return this[KEY_VALUE_MAP].size;
    }
    get srcObject() {
        return this[SRC_OBJECT];
    }
    //Methods
    *entries(...keyFilters) {
        if (keyFilters.length === 0) {
            yield* this[KEY_VALUE_MAP].entries();
            return;
        }
        const keyValueMap = this[KEY_VALUE_MAP];
        for (const key of this.keys(...keyFilters)) {
            yield [key, keyValueMap.get(key)];
        }
    }
    *keys(...keyFilters) {
        const keysIter = this[KEY_VALUE_MAP].keys();
        if (keyFilters.length === 0) {
            yield* keysIter;
            return;
        }
        const keyFilterTree = new Map();
        for (const keyFilter of keyFilters) {
            let curKeyFilterNode = keyFilterTree;
            const path = Array.from(new Path_1.default(keyFilter));
            //NOTE: Path searches happen from KeyNode to parent i.e. in reverse.
            while (path.length > 0) {
                let pathKey = path.pop();
                switch (pathKey) {
                    //Set wildcards  
                    case "*":
                        pathKey = INDEX_WILDCARD;
                        break;
                    //Unescape wildcard key  
                    case "\\*":
                        pathKey = "*";
                        break;
                }
                if (curKeyFilterNode.has(pathKey)) {
                    curKeyFilterNode = curKeyFilterNode.get(pathKey);
                    //Existing less complex fitler overides current query.
                    if (curKeyFilterNode.size === 0) {
                        break;
                    }
                }
                else {
                    let childKeyFilterNode = new Map();
                    curKeyFilterNode.set(pathKey, childKeyFilterNode);
                    curKeyFilterNode = childKeyFilterNode;
                }
            }
            //Override more complex filter.
            if (curKeyFilterNode.size > 0) {
                curKeyFilterNode.clear();
            }
        }
        //Find Matching KeyNodes
        for (const keyNode of keysIter) {
            let curKeyFilterNode = keyFilterTree;
            for (const curKeyNode of fromKeyNodeToRootKey(keyNode)) {
                const curKeyLiteral = curKeyNode.toString();
                if (curKeyFilterNode.has(INDEX_WILDCARD)) {
                    curKeyFilterNode = curKeyFilterNode.get(INDEX_WILDCARD);
                }
                else if (curKeyFilterNode.has(curKeyLiteral)) {
                    curKeyFilterNode = curKeyFilterNode.get(curKeyLiteral);
                    //NO matches stop  
                }
                else {
                    break;
                }
                //Match!
                if (curKeyFilterNode.size === 0) {
                    yield keyNode;
                    break;
                }
            }
        }
    }
    *values(...keyFilters) {
        if (keyFilters.length === 0) {
            yield* this[KEY_VALUE_MAP].values();
            return;
        }
        const keyValueMap = this[KEY_VALUE_MAP];
        for (const key of this.keys(...keyFilters)) {
            yield keyValueMap.get(key);
        }
    }
    rootKeys() {
        return this[ROOT_KEYS].values();
    }
    has(keyNode) {
        return this[KEY_VALUE_MAP].has(keyNode);
    }
    get(keyNode) {
        return this[KEY_VALUE_MAP].get(keyNode);
    }
    [Symbol.iterator]() {
        return this[KEY_VALUE_MAP][Symbol.iterator]();
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}
exports.default = KeyValueHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVIYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnQztBQUNoQywrQ0FBd0M7QUFDeEMsaUNBQTBCO0FBRTFCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxFQUFDLEdBQUc7SUFFM0IsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFDO1FBRXBCLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUV0QjtTQUFNO1FBRUwsTUFBTSxVQUFVLEdBQ2MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sWUFBWSxHQUNZLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlFLEtBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFDO1lBRWpCLElBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBQztnQkFFdEMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUV2QjtTQUVGO0tBRUY7QUFFSCxDQUFDLENBQUE7QUFFRCxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxFQUFDLE9BQWU7SUFFcEQsTUFBTSxPQUFPLENBQUM7SUFDZCxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFFM0IsQ0FBQyxDQUFBO0FBRUQsTUFBTSxhQUFhLEdBQWlCLE1BQU0sRUFBRSxDQUFDO0FBQzdDLE1BQU0sU0FBUyxHQUFpQixNQUFNLEVBQUUsQ0FBQztBQUN6QyxNQUFNLFVBQVUsR0FBaUIsTUFBTSxFQUFFLENBQUM7QUFFMUMsTUFBTSxjQUFjLEdBQWlCLE1BQU0sRUFB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