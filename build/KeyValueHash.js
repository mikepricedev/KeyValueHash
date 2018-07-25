"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyNode_1 = require("./KeyNode");
const path_notation_1 = require("path-notation");
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
        const rootKeys = new Map();
        //Root Keys
        for (const [k, val] of entries(objToHash)) {
            const rootKey = new KeyNode_1.default(k.toString(), rootKeys);
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
            const path = Array.from(new path_notation_1.default(keyFilter));
            //NOTE: PathNotation searches happen from KeyNode to parent i.e. in reverse.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVIYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFnQztBQUNoQyxpREFBeUM7QUFFekMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEVBQUMsR0FBRztJQUUzQixJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUM7UUFFcEIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBRXRCO1NBQU07UUFFTCxNQUFNLFVBQVUsR0FDYyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsTUFBTSxZQUFZLEdBQ1ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUUsS0FBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUM7WUFFakIsSUFBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUV0QyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBRXZCO1NBRUY7S0FFRjtBQUVILENBQUMsQ0FBQTtBQUVELE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLEVBQUMsT0FBZTtJQUVwRCxNQUFNLE9BQU8sQ0FBQztJQUNkLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUUzQixDQUFDLENBQUE7QUFFRCxNQUFNLGFBQWEsR0FBaUIsTUFBTSxFQUFFLENBQUM7QUFDN0MsTUFBTSxTQUFTLEdBQWlCLE1BQU0sRUFBRSxDQUFDO0FBQ3pDLE1BQU0sVUFBVSxHQUFpQixNQUFNLEVBQUUsQ0FBQztBQUUxQyxNQUFNLGNBQWMsR0FBaUIsTUFBTSxFQUFFLENBQUM7QUFFOUM7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