import {BaseKeyNode} from './KeyNode';

export default class KeyNodeError<TBaseKeyNode extends BaseKeyNode = BaseKeyNode> extends Error {

  constructor(msg:string, readonly KEY_NODE:TBaseKeyNode){

    super(msg);

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

}