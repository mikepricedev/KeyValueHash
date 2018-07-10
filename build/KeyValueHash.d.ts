import Key from './Key';
import RootKey from './RootKey';
declare const KEY_VALUE_MAP: unique symbol;
declare const ROOT_KEYS: unique symbol;
declare const OBJECT_KEY: unique symbol;
export default class KeyValueHash<TsrcObj extends object | any[] = object | any[]> {
    private readonly [KEY_VALUE_MAP];
    private readonly [ROOT_KEYS];
    private readonly [OBJECT_KEY];
    constructor(objToHash: TsrcObj);
    readonly size: Number;
    readonly srcObject: TsrcObj;
    entries(): IterableIterator<[Key, any]>;
    keys(): IterableIterator<Key>;
    values(): IterableIterator<any>;
    rootKeys(): IterableIterator<RootKey>;
    [Symbol.iterator](): IterableIterator<[Key, any]>;
    readonly [Symbol.toStringTag]: string;
}
export {};
