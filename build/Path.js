"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KEYS_KEY = Symbol();
class Path extends String {
    constructor(pathOrKey, ...keys) {
        const keysToSet = [];
        switch (typeof pathOrKey) {
            case 'string':
                keysToSet.push(...Path.pathNotationToKeys(pathOrKey));
                break;
            case 'number':
                keysToSet.push(...Path.pathNotationToKeys(pathOrKey.toString()));
                break;
            default:
                if (pathOrKey instanceof String && !(pathOrKey instanceof Path)) {
                    keysToSet.push(pathOrKey.toString());
                    break;
                }
                for (const keyLiteral of pathOrKey) {
                    keysToSet.push(keyLiteral.toString());
                }
        }
        for (const keyLiteral of keys) {
            keysToSet.push(keyLiteral.toString());
        }
        super(Path.keysToPathNotation(keysToSet));
        this[KEYS_KEY] = keysToSet;
    }
    //Accessors
    get numKeys() {
        return this[KEYS_KEY].length;
    }
    get depth() {
        return this[KEYS_KEY].length - 1;
    }
    get rootKey() {
        return this[KEYS_KEY][0];
    }
    get terminalKey() {
        return this[KEYS_KEY][this.depth];
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
    //Methods
    *keys() {
        let i = 0;
        for (let key of this[KEYS_KEY]) {
            i++;
            let remainingPath = yield key;
            while (remainingPath === true) {
                remainingPath = yield Path.keysToPathNotation(this[KEYS_KEY].slice(i));
            }
        }
    }
    parentPath(keyDepth) {
        const DEPTH = this.depth;
        if (keyDepth >= DEPTH) {
            throw new Error(`A parent 'Path.depth' must be less than it's children 'Path.depth(s)'.`);
        }
        return new Path(this[KEYS_KEY].slice(0, keyDepth + 1));
    }
    *[Symbol.iterator]() {
        yield* this[KEYS_KEY];
    }
    static *pathNotationToKeys(path) {
        const escapedKeys = new Map();
        //["@key"]
        path = path.replace(/\["(.+)"\]/g, (m, key) => {
            let placeHolder;
            do {
                placeHolder = `{%${Math.floor(Math.random() * 10 ** 4)}%}`;
            } while (escapedKeys.has(placeHolder));
            escapedKeys.set(placeHolder, key);
            return `.${placeHolder}.`;
        });
        //['@key']
        path = path.replace(/\['(.+)'\]/g, (m, key) => {
            let placeHolder;
            do {
                placeHolder = `{%${Math.floor(Math.random() * 10 ** 4)}%}`;
            } while (escapedKeys.has(placeHolder));
            escapedKeys.set(placeHolder, key);
            return `.${placeHolder}.`;
        });
        //Remove trailing '.'
        if (path.slice(-1) === '.') {
            path = path.slice(0, -1);
        }
        for (let key of path.split('.')) {
            yield escapedKeys.has(key) ? escapedKeys.get(key) : key;
        }
    }
    static keysToPathNotation(keys) {
        let pathNotation = '';
        let lastWasBracketNotation = false;
        for (let key of keys) {
            if (key.indexOf('.') > -1) {
                pathNotation += `["${key}"]`;
                lastWasBracketNotation = true;
            }
            else if (lastWasBracketNotation) {
                pathNotation += `${key}`;
                lastWasBracketNotation = false;
            }
            else {
                pathNotation += `.${key}`;
            }
        }
        //Remove leading "."
        return pathNotation.slice(1);
    }
}
exports.default = Path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxRQUFRLEdBQWlCLE1BQU0sRUFBRSxDQUFDO0FBRXhDLFVBQTBCLFNBQVEsTUFBTTtJQUl0QyxZQUNFLFNBQXVFLEVBQ3ZFLEdBQUcsSUFBaUM7UUFHcEMsTUFBTSxTQUFTLEdBQVksRUFBRSxDQUFDO1FBRTlCLFFBQU8sT0FBTyxTQUFTLEVBQUM7WUFFdEIsS0FBSyxRQUFRO2dCQUVYLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQVMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsTUFBTTtZQUVSLEtBQUssUUFBUTtnQkFFWCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE1BQU07WUFFUjtnQkFFRSxJQUFHLFNBQVMsWUFBWSxNQUFNLElBQUksQ0FBQyxDQUFDLFNBQVMsWUFBWSxJQUFJLENBQUMsRUFBQztvQkFFN0QsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDckMsTUFBTTtpQkFFUDtnQkFFRCxLQUFJLE1BQU0sVUFBVSxJQUErQixTQUFTLEVBQUM7b0JBRTNELFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBRXZDO1NBRUo7UUFFRCxLQUFJLE1BQU0sVUFBVSxJQUFJLElBQUksRUFBQztZQUUzQixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBRXZDO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FB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