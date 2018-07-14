declare const KEYS_KEY: unique symbol;
export default class Path extends String {
    private readonly [KEYS_KEY];
    constructor(pathOrKey: string | number | String | Iterable<string | number | String>, ...keys: (string | number | String)[]);
    readonly numKeys: number;
    readonly depth: number;
    readonly rootKey: string;
    readonly terminalKey: string;
    readonly [Symbol.toStringTag]: string;
    keys(): IterableIterator<string>;
    parentPath(keyDepth: number): Path;
    [Symbol.iterator](): IterableIterator<string>;
    static pathNotationToKeys(path: string): IterableIterator<string>;
    static keysToPathNotation(keys: Iterable<string>): string;
}
export {};
