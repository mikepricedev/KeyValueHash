import { BaseKeyValueNode } from 'key-value-node';
import PathNotation from 'path-notation';
declare const PATH_NOTATION: unique symbol;
export default class KeyValueNode extends BaseKeyValueNode<KeyValueNode> {
    private [PATH_NOTATION];
    constructor(key: string, parent: KeyValueNode);
    constructor(key: string, parent: Map<string, KeyValueNode>, rootDoc: object | any[]);
    readonly pathNotation: PathNotation;
}
export {};
