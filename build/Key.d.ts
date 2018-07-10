declare const PARENT_KEY: unique symbol;
declare const CHILDREN_KEYS: unique symbol;
export default class Key extends String {
    private readonly [PARENT_KEY];
    private readonly [CHILDREN_KEYS];
    constructor(key: string, parentKey?: Key);
    readonly isRootKey: boolean;
    readonly parent: Key;
    readonly [Symbol.toStringTag]: string;
    readonly dotNotatedPath: string;
    readonly numChildren: number;
    path(): IterableIterator<Key>;
    children(): IterableIterator<Key>;
    siblings(): IterableIterator<Key>;
}
export {};
