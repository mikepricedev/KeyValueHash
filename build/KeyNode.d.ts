import Path from './Path';
declare const PARENT: unique symbol;
declare const CHILDREN: unique symbol;
declare const IS_ROOT_KEY: unique symbol;
declare const DEPTH: unique symbol;
declare const PATH: unique symbol;
declare const PARENTS: unique symbol;
export default class KeyNode extends String {
    private readonly [PARENT];
    private readonly [CHILDREN];
    private readonly [IS_ROOT_KEY];
    private [PARENTS];
    private [DEPTH];
    private [PATH];
    constructor(key: string, parentKey?: KeyNode);
    readonly isRootKey: boolean;
    readonly isTerminalKey: boolean;
    readonly parent: KeyNode;
    readonly [Symbol.toStringTag]: string;
    readonly path: Path;
    readonly numChildren: number;
    readonly depth: number;
    parents(): IterableIterator<KeyNode>;
    children(): IterableIterator<KeyNode>;
    siblings(): IterableIterator<KeyNode>;
}
export {};
