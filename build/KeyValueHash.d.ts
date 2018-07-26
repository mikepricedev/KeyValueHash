import KeyValueNode from './KeyValueNode';
declare const KEY_VALUE_SET: unique symbol;
declare const ROOT_KEY_VALUES: unique symbol;
declare const SRC_OBJECT: unique symbol;
export default class KeyValueHash<TsrcObj extends object | any[] = object | any[]> {
    private readonly [KEY_VALUE_SET];
    private readonly [ROOT_KEY_VALUES];
    private readonly [SRC_OBJECT];
    constructor(objToHash: TsrcObj);
    readonly size: Number;
    readonly srcObject: TsrcObj;
    entries(...keyFilters: (string | number)[]): IterableIterator<[KeyValueNode, any]>;
    keys(...keyFilters: (string | number)[]): IterableIterator<KeyValueNode>;
    values(...keyFilters: (string | number)[]): IterableIterator<any>;
    rootKeys(): IterableIterator<KeyValueNode>;
    has(keyNode: KeyValueNode): boolean;
    [Symbol.iterator](): IterableIterator<[KeyValueNode, any]>;
    readonly [Symbol.toStringTag]: string;
}
export {};
