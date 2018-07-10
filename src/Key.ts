import KeyValueHash from './KeyValueHash';

const PARENT_KEY:unique symbol = Symbol();
const CHILDREN_KEYS:unique symbol = Symbol(); 

export default class Key extends String {

  private readonly [PARENT_KEY]:Key;
  private readonly [CHILDREN_KEYS] = new Set<Key>();

  constructor(key:string, parentKey:Key = null){

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

  get parent():Key{

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
  *path():IterableIterator<Key>{

    const path:Key[] = [this];

    let pKey = this[PARENT_KEY];

    while(pKey !== null){

      path.push(pKey);

      pKey = pKey[PARENT_KEY];

    }

    while(path.length > 0){

      yield path.pop();

    }

  }

  children():IterableIterator<Key>{

    return this[CHILDREN_KEYS].values();

  }

  *siblings():IterableIterator<Key>{

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