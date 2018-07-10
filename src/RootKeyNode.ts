import KeyNode from './KeyNode';

const ROOT_KEYS:unique symbol = Symbol();

export default class RootKeyNode extends KeyNode {

  private readonly [ROOT_KEYS]:Set<RootKeyNode>;

  constructor(key:string, rootKeys:Set<RootKeyNode>){

    super(key);

    rootKeys.add(this);

    this[ROOT_KEYS] = rootKeys;

  }

  *siblings():IterableIterator<RootKeyNode>{

    for(const sib of this[ROOT_KEYS]){

      if(sib !== this){

        yield sib;

      }

    }

  }

}