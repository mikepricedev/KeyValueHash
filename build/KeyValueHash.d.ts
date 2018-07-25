import KeyNode from './KeyNode';
declare const KEY_VALUE_MAP: unique symbol;
declare const ROOT_KEYS: unique symbol;
declare const SRC_OBJECT: unique symbol;
export default class KeyValueHash<TsrcObj extends object | any[] = object | any[]> {
    private readonly [KEY_VALUE_MAP];
    private readonly [ROOT_KEYS];
    private readonly [SRC_OBJECT];
    constructor(objToHash: TsrcObj);
    readonly size: Number;
    readonly srcObject: TsrcObj;
    entries(...keyFilters: (string | number)[]): IterableIterator<[KeyNode, any]>;
    keys(...keyFilters: (string | number)[]): IterableIterator<KeyNode>;
    values(...keyFilters: (string | number)[]): IterableIterator<any>;
    rootKeys(): IterableIterator<KeyNode>;
    has(keyNode: KeyNode): boolean;
    get(keyNode: KeyNode): any;
    [Symbol.iterator](): IterableIterator<[KeyNode, any]>;
    readonly [Symbol.toStringTag]: string;
}
export {};
