"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyValueNode_1 = require("./KeyValueNode");
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
const KEY_VALUE_SET = Symbol('KEY_VALUE_SET');
const ROOT_KEY_VALUES = Symbol('ROOT_KEY_VALUES');
const SRC_OBJECT = Symbol('SRC_OBJECT');
const INDEX_WILDCARD = Symbol();
class KeyValueHash {
    constructor(objToHash) {
        const keyValueSet = new Set();
        const rootKeyValues = new Map();
        //Root Keys
        for (const [k, val] of entries(objToHash)) {
            const rootKey = new KeyValueNode_1.default(k.toString(), rootKeyValues, objToHash);
            keyValueSet.add(rootKey);
        }
        for (const pKey of keyValueSet) {
            const { VALUE: pKeyVal } = pKey;
            if (typeof pKeyVal === 'object' && pKeyVal !== null) {
                for (const [k, val] of entries(pKeyVal)) {
                    const key = new KeyValueNode_1.default(k.toString(), pKey);
                    keyValueSet.add(key);
                }
            }
        }
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
        const keyFilterTree = new Map();
        for (const keyFilter of keyFilters) {
            let curKeyFilterNode = keyFilterTree;
            const path = Array.from(new path_notation_1.default(keyFilter));
            //NOTE: PathNotation searches happen from KeyValueNode to parent i.e. in reverse.
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
        //Find Matching KeyValueNodes
        for (const keyValueNode of this[KEY_VALUE_SET]) {
            let curKeyFilterNode = keyFilterTree;
            for (const curKeyValueNode of fromKeyValueNodeToRootKey(keyValueNode)) {
                const curKeyLiteral = curKeyValueNode.toString();
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
                    yield keyValueNode;
                    break;
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
    has(keyNode) {
        return this[KEY_VALUE_SET].has(keyNode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVIYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlSGFzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUEwQztBQUMxQyxpREFBeUM7QUFFekMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEVBQUMsR0FBRztJQUUzQixJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUM7UUFFcEIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBRXRCO1NBQU07UUFFTCxNQUFNLFVBQVUsR0FDYyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsTUFBTSxZQUFZLEdBQ1ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFOUUsS0FBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUM7WUFFakIsSUFBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFDO2dCQUV0QyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBRXZCO1NBRUY7S0FFRjtBQUVILENBQUMsQ0FBQTtBQUVELE1BQU0seUJBQXlCLEdBQUcsUUFBUSxDQUFDLEVBQUMsWUFBeUI7SUFFbkUsTUFBTSxZQUFZLENBQUM7SUFDbkIsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBRWhDLENBQUMsQ0FBQTtBQUVELE1BQU0sYUFBYSxHQUFpQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDNUQsTUFBTSxlQUFlLEdBQWlCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2hFLE1BQU0sVUFBVSxHQUFpQixNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFdEQsTUFB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