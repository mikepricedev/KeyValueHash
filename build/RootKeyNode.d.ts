import KeyNode from './KeyNode';
declare const ROOT_KEYS: unique symbol;
export default class RootKeyNode extends KeyNode {
    private readonly [ROOT_KEYS];
    constructor(key: string, rootKeys: Set<RootKeyNode>);
    siblings(): IterableIterator<RootKeyNode>;
}
export {};
