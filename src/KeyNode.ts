import KeyValueHash from './KeyValueHash';

const PARENT_KEY:unique symbol = Symbol();
const CHILDREN_KEYS:unique symbol = Symbol(); 

export default class KeyNode extends String {

  private readonly [PARENT_KEY]:KeyNode;
  private readonly [CHILDREN_KEYS] = new Set<KeyNode>();

  constructor(key:string, parentKey:KeyNode = null){

    super(key);

    this[PARENT_KEY] = parentKey;

    if(parentKey !== null){

      parentKey[CHILDREN_KEYS].add(this);

    }

  }

  //Accessors
  get isRootKey():boolean {

    return this[PARENT_KEY] === null;

  }  
  get isTerminalKey():boolean {

    return this[CHILDREN_KEYS].size === 0;

  }

  get parent():KeyNode{

    return this[PARENT_KEY];

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

  get dotNotatedPath():string{

    let path:string[] = [];

    for(const key of this.path()){

      path.push(key.toString());

    }

    return path.join('.');

  }

  get numChildren():number{

    return this[CHILDREN_KEYS].size;

  }

  //Mehtods
  *path():IterableIterator<KeyNode>{

    const path:KeyNode[] = [this];

    let pKey = this[PARENT_KEY];

    while(pKey !== null){

      path.push(pKey);

      pKey = pKey[PARENT_KEY];

    }

    while(path.length > 0){

      yield path.pop();

    }

  }

  children():IterableIterator<KeyNode>{

    return this[CHILDREN_KEYS].values();

  }

  *siblings():IterableIterator<KeyNode>{

    const parent = this[PARENT_KEY];

    if(parent === null){

      return;

    }

    for(const sib of parent.children()){

      if(sib !== this){

        yield sib;

      }

    }

  }

}