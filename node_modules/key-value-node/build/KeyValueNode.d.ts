import { BaseKeyNode } from 'key-node';
declare const VALUE: unique symbol;
declare const DOC: unique symbol;
export declare class BaseKeyValueNode<Tself extends BaseKeyValueNode = any> extends BaseKeyNode<Tself> {
    private readonly [VALUE];
    private readonly [DOC];
    constructor(key: string, parent: Tself);
    constructor(key: string, parent: Map<string, Tself>, rootDoc: object | any[]);
    readonly key: string;
    readonly value: any;
    readonly doc: object | any[];
}
export declare class KeyValueNode extends BaseKeyValueNode<KeyValueNode> {
}
export {};
