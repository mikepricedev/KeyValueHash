import KeyValueHash from './KeyValueHash';
import Path from './Path';

const PARENT:unique symbol = Symbol();
const CHILDREN:unique symbol = Symbol();
const IS_ROOT_KEY:unique symbol = Symbol();
const DEPTH:unique symbol = Symbol();
const PATH:unique symbol = Symbol();
const PARENTS:unique symbol = Symbol();


export default class KeyNode extends String {

  private readonly [PARENT]:KeyNode;
  private readonly [CHILDREN] = new Set<KeyNode>();
  private readonly [IS_ROOT_KEY]:boolean;
  private [PARENTS]:Set<KeyNode>;
  private [DEPTH]:number;
  private [PATH]:Path;

  constructor(key:string, parentKey:KeyNode = null){

    super(key);

    this[PARENT] = parentKey;

    if(parentKey !== null){

      parentKey[CHILDREN].add(this);

    }

    this[IS_ROOT_KEY] = this[PARENT] === null;

  }

  //Accessors
  get isRootKey():boolean {

    return this[IS_ROOT_KEY];

  }  
  get isTerminalKey():boolean {

    return this[CHILDREN].size === 0;

  }

  get parent():KeyNode{

    return this[PARENT];

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

  get path():Path{

    //Get and cache depth; lazy
    if(this[PATH] === undefined){

      let path:KeyNode[] = [this];

      for(const parent of this.parents()){

        path.unshift(parent);

      }

      this[PATH] = new Path(path);

    }

    return this[PATH];

  }

  get numChildren():number{

    return this[CHILDREN].size;

  }

  get depth():number {

    //Get and cache depth; lazy
    if(this[DEPTH] === undefined){

      let depth = 0;

      for(const pKey of this.parents()){

        depth++;

      }

      this[DEPTH] = depth;

    }

    return this[DEPTH];

  }

  //Mehtods
  parents():IterableIterator<KeyNode>{

    //Get and cache parents; lazy
    if(this[PARENTS] === undefined){

      let pKeys = new Set<KeyNode>();

      let pKey = this[PARENT];

      while(pKey !== null){

        pKeys.add(pKey);

        pKey = pKey[PARENT]

      }

      this[PARENTS] = pKeys;

    }

    return this[PARENTS].values();
  
  }

  children():IterableIterator<KeyNode>{

    return this[CHILDREN].values();

  }

  *siblings():IterableIterator<KeyNode>{

    //NOTE: Not cached b/c can increase.
    const parent = this[PARENT];

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