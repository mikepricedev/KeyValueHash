import PathNotation from 'path-notation';
import KeyNodeError from './KeyNodeError';

export const ROOT_KEYS:unique symbol = Symbol('ROOT_KEYS');
const ROOT_KEY:unique symbol = Symbol('ROOT_KEY');
const CHILDREN:unique symbol = Symbol('CHILDREN');
const DEPTH:unique symbol = Symbol('DEPTH');
const PATH_NOTATION:unique symbol = Symbol('PATH_NOTATION');

export abstract class BaseKeyNode<Tself extends BaseKeyNode = any> extends String {

  readonly IS_ROOT_KEY:boolean;
  readonly PARENT:Tself;

  private [ROOT_KEY]:Tself;
  protected readonly [ROOT_KEYS]?:Map<string,Tself>;
  private readonly [CHILDREN] = new Map<string,Tself>();
  private [DEPTH]:number;
  private [PATH_NOTATION]:PathNotation;

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
      this[DEPTH] = 0;

    } else {

      this.PARENT = <Tself>parent;
      this.IS_ROOT_KEY = false;
      this[DEPTH] = (<Tself>parent).depth + 1

    }

  }

  //Accessors
  get rootKey():Tself {

    //Lazy cache
    if(this[ROOT_KEY] === undefined){

      this[ROOT_KEY] = this.pathToKey().next().value;

    }

    return this[ROOT_KEY];

  };

  get isTerminalKey():boolean {

    return this[CHILDREN].size === 0;

  }


  get numChildren():number{

    return this[CHILDREN].size;

  }

  get depth():number {

    return this[DEPTH];

  }

  get pathNotation():PathNotation{

    //Lazy cache
    if(this[PATH_NOTATION] === undefined){

      this[PATH_NOTATION] = new PathNotation(this.pathToKey());

    }

    return this[PATH_NOTATION];

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }


  //Mehtods
  hasChild(childKey:string | number):boolean{

    const childKeyLiteral = childKey.toString();

    return this[CHILDREN].has(childKeyLiteral);

  }

  getChild(childKey:string | number):Tself {

    const childKeyLiteral = childKey.toString();

    const children = this[CHILDREN];

    return children.has(childKeyLiteral) ? children.get(childKeyLiteral) : null;

  }


  hasSibling(siblingKey:string | number):boolean{

    const siblingKeyLiteral = siblingKey.toString();
    
    if(siblingKeyLiteral === this.toString()){

      return false;

    }

    const sliblingKeyLib = this.IS_ROOT_KEY ? this[ROOT_KEYS] : this.PARENT[CHILDREN];

    return sliblingKeyLib.has(siblingKeyLiteral);

  }

  getSibling(siblingKey:string | number):Tself  {

    const siblingKeyLiteral = siblingKey.toString();
    
    if(siblingKeyLiteral === this.toString()){

      return null;

    }

    const sliblingKeyLib = this.IS_ROOT_KEY ? this[ROOT_KEYS] : this.PARENT[CHILDREN];

    return sliblingKeyLib.has(siblingKeyLiteral) ? sliblingKeyLib.get(siblingKeyLiteral) : null;

  }

  children():IterableIterator<Tself>{

    return this[CHILDREN].values();

  }

  *parents():IterableIterator<Tself>{

    let pKey = this.PARENT;

    while(pKey !== null){

      yield pKey;

      pKey = pKey.PARENT

    }
  
  }

  *pathToKey(inlcudeSelf = true):IterableIterator<Tself>{

    if(this.IS_ROOT_KEY){

      if(inlcudeSelf){

        yield <any>this;

      }

      return;
     
    }

    yield* this.PARENT.pathToKey(true);

    if(inlcudeSelf){

      yield <any>this;

    }
  
  }

  *siblings():IterableIterator<Tself>{

    const siblingsIter = this.IS_ROOT_KEY ? this[ROOT_KEYS].values() : this.PARENT.children();

    for(const sib of siblingsIter){

      if(sib !== this){

        yield sib;

      }

    }

  }

}

export class KeyNode extends BaseKeyNode<KeyNode> {}