import { BaseKeyNode } from './KeyNode';
export default class KeyNodeError<TBaseKeyNode extends BaseKeyNode = BaseKeyNode> extends Error {
    readonly KEY_NODE: TBaseKeyNode;
    constructor(msg: string, KEY_NODE: TBaseKeyNode);
    readonly [Symbol.toStringTag]: string;
}
