"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_value_node_1 = require("key-value-node");
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
const fromKeyValueNodeToRootKey = function* (keyValueNode) {
    yield keyValueNode;
    yield* keyValueNode.parents();
};
const KEY_VALUE_MAP = Symbol('KEY_VALUE_MAP');
const KEY_VALUE_SET = Symbol('KEY_VALUE_SET');
const ROOT_KEY_VALUES = Symbol('ROOT_KEY_VALUES');
const SRC_OBJECT = Symbol('SRC_OBJECT');
const INDEX_WILDCARD = Symbol();
class KeyValueHash {
    constructor(objToHash) {
        const keyKeyNodeMap = new Map();
        const keyValueSet = new Set();
        const rootKeyValues = new Map();
        //Root Keys
        for (const [k, val] of entries(objToHash)) {
            const rootKey = new key_value_node_1.default(k.toString(), rootKeyValues, objToHash);
            keyValueSet.add(rootKey);
            keyKeyNodeMap.set(rootKey.toString(), new Set([rootKey]));
        }
        for (const pKey of keyValueSet) {
            const { VALUE: pKeyVal } = pKey;
            if (typeof pKeyVal === 'object' && pKeyVal !== null) {
                for (const [k, val] of entries(pKeyVal)) {
                    const key = new key_value_node_1.default(k.toString(), pKey);
                    keyValueSet.add(key);
                    const kStr = key.toString();
                    if (!keyKeyNodeMap.has(kStr)) {
                        keyKeyNodeMap.set(kStr, new Set());
                    }
                    keyKeyNodeMap.get(kStr).add(key);
                }
            }
        }
        this[KEY_VALUE_MAP] = keyKeyNodeMap;
        this[KEY_VALUE_SET] = keyValueSet;
        this[ROOT_KEY_VALUES] = rootKeyValues;
        this[SRC_OBJECT] = objToHash;
    }
    //Accessors
    get size() {
        return this[KEY_VALUE_SET].size;
    }
    get srcObject() {
        return this[SRC_OBJECT];
    }
    //Methods
    *entries(...keyFilters) {
        for (const keyValueNode of this.keys(...keyFilters)) {
            yield [keyValueNode, keyValueNode.VALUE];
        }
    }
    *keys(...keyFilters) {
        if (keyFilters.length === 0) {
            yield* this[KEY_VALUE_SET];
            return;
        }
        const keyKeyNodeMap = this[KEY_VALUE_MAP];
        const yielded = new Set();
        for (const keyFilter of keyFilters) {
            const pathIter = new path_notation_1.default(keyFilter).keys();
            let pathIterResult = pathIter.next();
            let { value: filterKey } = pathIterResult;
            //Starting nodes
            const matchedNodes = Array.from(filterKey === '*' ?
                this[KEY_VALUE_SET]
                :
                    (keyKeyNodeMap.has(filterKey) ? keyKeyNodeMap.get(filterKey) : []));
            pathIterResult = pathIter.next();
            while (!pathIterResult.done) {
                if (matchedNodes.length === 0) {
                    break;
                }
                filterKey = pathIterResult.value;
                switch (filterKey) {
                    //Wildcard
                    case '*':
                        for (const matchNode of matchedNodes.splice(0)) {
                            matchedNodes.push(...matchNode.children());
                        }
                        break;
                    //Escaped wildcard key    
                    case '\\*':
                        filterKey = '*';
                    default:
                        for (const matchedNode of matchedNodes.splice(0)) {
                            if (matchedNode.hasChild(filterKey)) {
                                matchedNodes.push(matchedNode.getChild(filterKey));
                            }
                        }
                }
                pathIterResult = pathIter.next();
            }
            for (const matchedNode of matchedNodes) {
                if (!yielded.has(matchedNode)) {
                    yielded.add(matchedNode);
                    yield matchedNode;
                }
            }
        }
    }
    *values(...keyFilters) {
        for (const keyValueNode of this.keys(...keyFilters)) {
            yield keyValueNode.VALUE;
        }
    }
    rootKeys() {
        return this[ROOT_KEY_VALUES].values();
    }
    has(key) {
        return this[KEY_VALUE_MAP].has(key.toString());
    }
    *[Symbol.iterator]() {
        for (const keyValueNode of this[KEY_VALUE_SET]) {
            yield [keyValueNode, keyValueNode.VALUE];
        }
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}
exports.default = KeyValueHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVIYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUEwQztBQUMxQyxpREFBeUM7QUFFekMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEVBQUMsR0FBRztJQUUzQixJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUM7UUFFcEIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBRXRCO1NBQU07UUFFTCxNQUFNLFVBQVUsR0FDYyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsTUFBTSxZQUFZLEdBQ1ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUUsS0FBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUM7WUFFakIsSUFBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUV0QyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBRXZCO1NBRUY7S0FFRjtBQUVILENBQUMsQ0FBQTtBQUVELE1BQU0seUJBQXlCLEdBQUcsUUFBUSxDQUFDLEVBQUMsWUFBeUI7SUFFbkUsTUFBTSxZQUFZLENBQUM7SUFDbkIsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRWhDLENBQUMsQ0FBQTtBQUVELE1BQU0sYUFBYSxHQUFpQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDNUQsTUFBTSxhQUFhLEdBQWlCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM1RCxNQUFNLGVBQWUsR0FBaUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDaEUsTUFB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