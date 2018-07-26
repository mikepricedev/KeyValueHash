import KeyValueNode from './KeyValueNode';
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

const fromKeyValueNodeToRootKey = function*(keyValueNode:KeyValueNode){

  yield keyValueNode;
  yield* keyValueNode.parents();

}

const KEY_VALUE_SET:unique symbol = Symbol('KEY_VALUE_SET');
const ROOT_KEY_VALUES:unique symbol = Symbol('ROOT_KEY_VALUES');
const SRC_OBJECT:unique symbol = Symbol('SRC_OBJECT');

const INDEX_WILDCARD:unique symbol = Symbol();

export default class KeyValueHash<TsrcObj extends object| any[] = object| any[]> {

  private readonly [KEY_VALUE_SET]: Set<KeyValueNode>;
  private readonly [ROOT_KEY_VALUES]:Map<string,KeyValueNode>;
  private readonly [SRC_OBJECT]:TsrcObj;

  constructor(objToHash:TsrcObj){

    const keyValueSet = new Set<KeyValueNode>();
    const rootKeyValues = new Map<string,KeyValueNode>();

    //Root Keys
    for(const [k, val] of entries(objToHash)){

      const rootKey = new KeyValueNode(k.toString(), rootKeyValues, objToHash);

      keyValueSet.add(rootKey);

    }
    
    for(const pKey of keyValueSet){
       
      const {VALUE:pKeyVal} = pKey;
        
      if(typeof pKeyVal === 'object' && pKeyVal !== null){

        for(const [k, val] of entries(pKeyVal)){

          const key = new KeyValueNode(k.toString(), pKey);

          keyValueSet.add(key);

        }

      }

    }
    
    this[KEY_VALUE_SET] = keyValueSet;
    this[ROOT_KEY_VALUES] = rootKeyValues;
    this[SRC_OBJECT] = objToHash;

  }

  //Accessors
  get size():Number{

    return this[KEY_VALUE_SET].size;

  }

  get srcObject():TsrcObj{

    return this[SRC_OBJECT];

  }

  //Methods
  *entries(...keyFilters:(string | number)[]):IterableIterator<[KeyValueNode, any]>{

    for(const keyValueNode of this.keys(...keyFilters)){

      yield [keyValueNode, keyValueNode.VALUE]

    }

  }
 
  *keys(...keyFilters:(string | number)[]):IterableIterator<KeyValueNode>{
    
    if(keyFilters.length === 0){

      yield* this[KEY_VALUE_SET];

      return;

    }

    //Build Key literal and path filters
    interface IKeyfiltersTree extends Map<string | symbol, IKeyfiltersTree>{}

    const keyFilterTree:IKeyfiltersTree = new Map();

    for(const keyFilter of keyFilters){

      let curKeyFilterNode = keyFilterTree;

      const path = Array.from(new PathNotation(keyFilter));


      //NOTE: PathNotation searches happen from KeyValueNode to parent i.e. in reverse.
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

    //Find Matching KeyValueNodes
    for(const keyValueNode of this[KEY_VALUE_SET]){

      let curKeyFilterNode = keyFilterTree;

      for(const curKeyValueNode of fromKeyValueNodeToRootKey(keyValueNode)){

        const curKeyLiteral = curKeyValueNode.toString();

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

          yield keyValueNode;

          break; 

        }

      }
      
    }
  
  }
 
  *values(...keyFilters:(string | number)[]):IterableIterator<any>{
    
    for(const keyValueNode of this.keys(...keyFilters)){

      yield keyValueNode.VALUE;

    }
  
  }

  rootKeys():IterableIterator<KeyValueNode>{

    return this[ROOT_KEY_VALUES].values();

  }

  has(keyNode:KeyValueNode):boolean{

    return this[KEY_VALUE_SET].has(keyNode);

  }

  *[Symbol.iterator]():IterableIterator<[KeyValueNode, any]>{

     for(const keyValueNode of this[KEY_VALUE_SET]){

       yield [keyValueNode, keyValueNode.VALUE];

     } 

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

}