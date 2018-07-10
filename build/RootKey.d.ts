import Key from './Key';
declare const ROOT_KEYS: unique symbol;
export default class RootKey extends Key {
    private readonly [ROOT_KEYS];
    constructor(key: string, rootKeys: Set<RootKey>);
    siblings(): IterableIterator<Key>;
}
export {};
