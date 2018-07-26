import { BaseKeyNode } from 'key-node';
export declare class BaseKeyValueNode<Tself extends BaseKeyValueNode = any> extends BaseKeyNode<Tself> {
    readonly VALUE: any;
    readonly DOC: object | any[];
    constructor(key: string, parent: Tself);
    constructor(key: string, parent: Map<string, Tself>, rootDoc: object | any[]);
    readonly key: string;
}
export declare class KeyValueNode extends BaseKeyValueNode<KeyValueNode> {
}
