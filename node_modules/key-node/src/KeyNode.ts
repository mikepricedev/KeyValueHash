import KeyNodeError from './KeyNodeError';

export const ROOT_KEYS:unique symbol = Symbol('Root Keys Lib');
const CHILDREN:unique symbol = Symbol('Child Keys Lib');
const DEPTH:unique symbol = Symbol('Depth Cache');
const PARENTS:unique symbol = Symbol('Parents Cache');

export abstract class BaseKeyNode<Tself extends BaseKeyNode = any> extends String {

  readonly IS_ROOT_KEY:boolean;
  readonly PARENT:Tself;

  protected readonly [ROOT_KEYS]?:Map<string,Tself>;
  private readonly [CHILDREN] = new Map<string,Tself>();
  private [DEPTH]:number;
  private [PARENTS]:Set<Tself>;

  constructor(key:string, parent:Tself | Map<string, Tself>){

    super(key);

    const keyLiteral = this.toString();
    const parentIsRootKeyLib = parent instanceof Map;
    const siblingLib:Map<string,Tself> = parentIsRootKeyLib ? parent : parent[CHILDREN];

    if(siblingLib.has(keyLiteral)){

      throw new KeyNodeError<Tself>(`'${keyLiteral}' already exists in sibling set.`+
        `  Sibling key literals must be unique.`, siblingLib.get(keyLiteral));

    }

    siblingLib.set(keyLiteral, <any>this);

    if(parentIsRootKeyLib){

      this[ROOT_KEYS] = siblingLib;
      this.PARENT = null;
      this.IS_ROOT_KEY = true;

    } else {

      this.PARENT = <Tself>parent;
      this.IS_ROOT_KEY = false;

    }

  }

  //Accessors 
  get isTerminalKey():boolean {

    return this[CHILDREN].size === 0;

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

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }


  //Mehtods
  hasChild(childKey:string):boolean{

    return this[CHILDREN].has(childKey);

  }

  getChild(childKey:string):Tself {

    const children = this[CHILDREN];

    return children.has(childKey) ? children.get(childKey) : null;

  }


  hasSibling(siblingKey:string):boolean{

    const sliblingKeyLib = this.IS_ROOT_KEY ? this[ROOT_KEYS] : this.PARENT[CHILDREN];

    return sliblingKeyLib.has(siblingKey) ? 
      sliblingKeyLib.get(siblingKey) !== this : false;

  }

  getSibling(siblingKey:string):Tself  {

    if(this.hasSibling(siblingKey)){

      const sliblingKeyLib = this.IS_ROOT_KEY ? this[ROOT_KEYS] : this.PARENT[CHILDREN];

      return sliblingKeyLib.get(siblingKey);

    };

    return null;

  }

  children():IterableIterator<Tself>{

    //NOTE: Not cached b/c can increase.
    return this[CHILDREN].values();

  }

  parents():IterableIterator<Tself>{

    //Get and cache parents; lazy
    if(this[PARENTS] === undefined){

      let pKeys = new Set<Tself>();

      let pKey = this.PARENT;

      while(pKey !== null){

        pKeys.add(pKey);

        pKey = pKey.PARENT

      }

      this[PARENTS] = pKeys;

    }

    return this[PARENTS].values();
  
  }

  *siblings():IterableIterator<Tself>{

    //NOTE: Not cached b/c can increase.
    const siblingsIter = this.IS_ROOT_KEY ? this[ROOT_KEYS].values() : this.PARENT.children();

    for(const sib of siblingsIter){

      if(sib !== this){

        yield sib;

      }

    }

  }

}

export class KeyNode extends BaseKeyNode<KeyNode> {}