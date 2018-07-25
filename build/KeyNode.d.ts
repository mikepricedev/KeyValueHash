import { BaseKeyNode } from 'key-node';
import PathNotation from 'path-notation';
declare const PATH_NOTATION: unique symbol;
export default class KeyNode extends BaseKeyNode<KeyNode> {
    private [PATH_NOTATION];
    readonly pathNotation: PathNotation;
}
export {};
