declare const PARENT_KEY: unique symbol;
declare const CHILDREN_KEYS: unique symbol;
export default class KeyNode extends String {
    private readonly [PARENT_KEY];
    private readonly [CHILDREN_KEYS];
    constructor(key: string, parentKey?: KeyNode);
    readonly isRootKey: boolean;
    readonly parent: KeyNode;
    readonly [Symbol.toStringTag]: string;
    readonly dotNotatedPath: string;
    readonly numChildren: number;
    path(): IterableIterator<KeyNode>;
    children(): IterableIterator<KeyNode>;
    siblings(): IterableIterator<KeyNode>;
}
export {};
