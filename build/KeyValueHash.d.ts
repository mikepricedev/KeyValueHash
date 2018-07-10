import KeyNode from './KeyNode';
import RootKeyNode from './RootKeyNode';
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
    entries(): IterableIterator<[KeyNode, any]>;
    keys(): IterableIterator<KeyNode>;
    values(): IterableIterator<any>;
    rootKeys(): IterableIterator<RootKeyNode>;
    [Symbol.iterator](): IterableIterator<[KeyNode, any]>;
    readonly [Symbol.toStringTag]: string;
}
export {};
