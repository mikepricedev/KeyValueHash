import PathNotation from 'path-notation';
export declare const ROOT_KEYS: unique symbol;
declare const ROOT_KEY: unique symbol;
declare const CHILDREN: unique symbol;
declare const DEPTH: unique symbol;
declare const PATH_NOTATION: unique symbol;
export declare abstract class BaseKeyNode<Tself extends BaseKeyNode = any> extends String {
    readonly IS_ROOT_KEY: boolean;
    readonly PARENT: Tself;
    private [ROOT_KEY];
    protected readonly [ROOT_KEYS]?: Map<string, Tself>;
    private readonly [CHILDREN];
    private [DEPTH];
    private [PATH_NOTATION];
    constructor(key: string, parent: Tself | Map<string, Tself>);
    readonly rootKey: Tself;
    readonly isTerminalKey: boolean;
    readonly numChildren: number;
    readonly depth: number;
    readonly pathNotation: PathNotation;
    readonly [Symbol.toStringTag]: string;
    hasChild(childKey: string | number): boolean;
    getChild(childKey: string | number): Tself;
    hasSibling(siblingKey: string | number): boolean;
    getSibling(siblingKey: string | number): Tself;
    children(): IterableIterator<Tself>;
    parents(): IterableIterator<Tself>;
    pathToKey(inlcudeSelf?: boolean): IterableIterator<Tself>;
    siblings(): IterableIterator<Tself>;
}
export declare class KeyNode extends BaseKeyNode<KeyNode> {
}
export {};
