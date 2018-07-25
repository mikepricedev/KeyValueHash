import KeyNode from './KeyNode';
import PathNotation from 'path-notation';

const entries = function*(obj):IterableIterator<[string | number, any]>{

  if(Array.isArray(obj)){

    yield* obj.entries();

  } else {

    const hasOwnProp = 
      <(key:PropertyKey)=>boolean>Object.prototype.hasOwnProperty.bind(obj);
    const isEnumerable = 
      <(key:PropertyKey)=>boolean>Object.prototype.propertyIsEnumerable.bind(obj);

    for(let key in obj){

      if(hasOwnProp(key) && isEnumerable(key)){

        yield [key, obj[key]];

      }

    }

  }

}

const fromKeyNodeToRootKey = function*(keyNode:KeyNode){

  yield keyNode;
  yield* keyNode.parents();

}

const KEY_VALUE_MAP:unique symbol = Symbol();
const ROOT_KEYS:unique symbol = Symbol();
const SRC_OBJECT:unique symbol = Symbol();

const INDEX_WILDCARD:unique symbol = Symbol();

export default class KeyValueHash<TsrcObj extends object| any[] = object| any[]> {

  private readonly [KEY_VALUE_MAP]: Map<KeyNode, any>;
  private readonly [ROOT_KEYS]:Map<string,KeyNode>;
  private readonly [SRC_OBJECT]:TsrcObj;

  constructor(objToHash:TsrcObj){

    const keyValueMap = new Map<KeyNode, any>();
    const rootKeys = new Map<string,KeyNode>();

    //Root Keys
    for(const [k, val] of entries(objToHash)){

      const rootKey = new KeyNode(k.toString(), rootKeys);

      keyValueMap.set(rootKey, val);

    }
    
    for(const [pKey, pKeyVal] of keyValueMap){
      
      if(typeof pKeyVal === 'object' && pKeyVal !== null){

        for(const [k, val] of entries(pKeyVal)){

          const key = new KeyNode(k.toString(), pKey);

          keyValueMap.set(key, val);

        }

      }

    }
    
    this[KEY_VALUE_MAP] = keyValueMap;
    this[ROOT_KEYS] = rootKeys;
    this[SRC_OBJECT] = objToHash;

  }

  //Accessors
  get size():Number{

    return this[KEY_VALUE_MAP].size;

  }

  get srcObject():TsrcObj{

    return this[SRC_OBJECT];

  }

  //Methods
  *entries(...keyFilters:(string | number)[]):IterableIterator<[KeyNode, any]>{

    if(keyFilters.length === 0){

      yield *this[KEY_VALUE_MAP].entries();

      return;

    }

    const keyValueMap =  this[KEY_VALUE_MAP];

    for(const key of this.keys(...keyFilters)){

      yield [key, keyValueMap.get(key)];

    }
  
  }
 
  *keys(...keyFilters:(string | number)[]):IterableIterator<KeyNode>{
    
    const keysIter = this[KEY_VALUE_MAP].keys();

    if(keyFilters.length === 0){

      yield* keysIter;

      return;

    }

    //Build Key literal and path filters
    interface IKeyfiltersTree extends Map<string | symbol, IKeyfiltersTree>{}

    const keyFilterTree:IKeyfiltersTree = new Map();

    for(const keyFilter of keyFilters){

      let curKeyFilterNode = keyFilterTree;

      const path = Array.from(new PathNotation(keyFilter));


      //NOTE: PathNotation searches happen from KeyNode to parent i.e. in reverse.
      while(path.length > 0){

        let pathKey:string | symbol = path.pop();

        switch (pathKey) {
          
          //Set wildcards  
          case "*":
            
            pathKey = INDEX_WILDCARD;
            break;
          
          //Unescape wildcard key  
          case "\\*":
            
            pathKey = "*";
            break;
        
        }

        if(curKeyFilterNode.has(pathKey)){

          curKeyFilterNode = curKeyFilterNode.get(pathKey);

          //Existing less complex fitler overides current query.
          if(curKeyFilterNode.size === 0){

            break;

          }

        } else {

          let childKeyFilterNode = new Map();

          curKeyFilterNode.set(pathKey, childKeyFilterNode);

          curKeyFilterNode = childKeyFilterNode;

        }

      }

      //Override more complex filter.
      if(curKeyFilterNode.size > 0){

        curKeyFilterNode.clear();

      }

    }

    //Find Matching KeyNodes
    for(const keyNode of keysIter){

      let curKeyFilterNode = keyFilterTree;

      for(const curKeyNode of fromKeyNodeToRootKey(keyNode)){

        const curKeyLiteral = curKeyNode.toString();

        if(curKeyFilterNode.has(INDEX_WILDCARD)){
        
          curKeyFilterNode = curKeyFilterNode.get(INDEX_WILDCARD);

        } else if(curKeyFilterNode.has(curKeyLiteral)){

          curKeyFilterNode = curKeyFilterNode.get(curKeyLiteral);
        
        //NO matches stop  
        } else {

          break;

        }

        //Match!
        if(curKeyFilterNode.size === 0){

          yield keyNode;

          break; 

        }

      }
      
    }
  
  }
 
  *values(...keyFilters:(string | number)[]):IterableIterator<any>{
    
    if(keyFilters.length === 0){

      yield* this[KEY_VALUE_MAP].values();

      return;

    }

    const keyValueMap =  this[KEY_VALUE_MAP];

    for(const key of this.keys(...keyFilters)){

      yield keyValueMap.get(key);

    }
  
  }

  rootKeys():IterableIterator<KeyNode>{

    return this[ROOT_KEYS].values();

  }

  has(keyNode:KeyNode):boolean{

    return this[KEY_VALUE_MAP].has(keyNode);

  }

  get(keyNode:KeyNode):any{

    return this[KEY_VALUE_MAP].get(keyNode);

  }

  [Symbol.iterator]():IterableIterator<[KeyNode, any]>{

    return this[KEY_VALUE_MAP][Symbol.iterator]();

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

}