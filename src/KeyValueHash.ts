import KeyValueNode from 'key-value-node';
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

const KEY_VALUE_MAP:unique symbol = Symbol('KEY_VALUE_MAP');
const KEY_VALUE_SET:unique symbol = Symbol('KEY_VALUE_SET');
const ROOT_KEY_VALUES:unique symbol = Symbol('ROOT_KEY_VALUES');
const SRC_OBJECT:unique symbol = Symbol('SRC_OBJECT');

const INDEX_WILDCARD:unique symbol = Symbol();

export default class KeyValueHash<TsrcObj extends object| any[] = object| any[]> {

  private readonly [KEY_VALUE_MAP]:Map<string,Set<KeyValueNode>>;
  private readonly [KEY_VALUE_SET]: Set<KeyValueNode>;
  private readonly [ROOT_KEY_VALUES]:Map<string,KeyValueNode>;
  private readonly [SRC_OBJECT]:TsrcObj;

  constructor(objToHash:TsrcObj){

    const keyKeyNodeMap = new Map<string,Set<KeyValueNode>>();
    const keyValueSet = new Set<KeyValueNode>();
    const rootKeyValues = new Map<string,KeyValueNode>();

    //Root Keys
    for(const [k, val] of entries(objToHash)){

      const rootKey = new KeyValueNode(k.toString(), rootKeyValues, objToHash);

      keyValueSet.add(rootKey);

      keyKeyNodeMap.set(rootKey.toString(), new Set([rootKey]));

    }
    
    for(const pKey of keyValueSet){
       
      const {value:pKeyVal} = pKey;
        
      if(typeof pKeyVal === 'object' && pKeyVal !== null){

        for(const [k, val] of entries(pKeyVal)){

          const key = new KeyValueNode(k.toString(), pKey);

          keyValueSet.add(key);

          const kStr = key.toString();

          if(!keyKeyNodeMap.has(kStr)){

            keyKeyNodeMap.set(kStr, new Set());

          }

          keyKeyNodeMap.get(kStr).add(key);

        }

      }

    }
    
    this[KEY_VALUE_MAP] = keyKeyNodeMap;  
    this[KEY_VALUE_SET] = keyValueSet;
    this[ROOT_KEY_VALUES] = rootKeyValues;
    this[SRC_OBJECT] = objToHash;

  }

  //Accessors
  get size():number{

    return this[KEY_VALUE_SET].size;

  }

  get srcObject():TsrcObj{

    return this[SRC_OBJECT];

  }

  //Methods
  *entries(...keyFilters:(string | number)[]):IterableIterator<[KeyValueNode, any]>{

    for(const keyValueNode of this.keys(...keyFilters)){

      yield [keyValueNode, keyValueNode.value]

    }

  }

  *keys(...keyFilters:(string | number)[]):IterableIterator<KeyValueNode>{
    
    if(keyFilters.length === 0){

      yield* this[KEY_VALUE_SET];

      return;

    }

    const keyKeyNodeMap = this[KEY_VALUE_MAP];

    const yielded = new Set<KeyValueNode>();

    for(const keyFilter of keyFilters){

      const pathIter = new PathNotation(keyFilter).keys();
      let pathIterResult = pathIter.next();
      let {value:filterKey} = pathIterResult;

      //Starting nodes
      const matchedNodes = Array.from(
        filterKey === '*' ? 
          this[KEY_VALUE_SET] 
          : 
          (keyKeyNodeMap.has(filterKey) ? keyKeyNodeMap.get(filterKey) : [])
      );

      pathIterResult = pathIter.next();
      

      while(!pathIterResult.done){

        if(matchedNodes.length === 0){

          break;

        }

        filterKey = pathIterResult.value;

        switch(filterKey){

          //Wildcard
          case '*':

            for(const matchNode of matchedNodes.splice(0)){

              matchedNodes.push(...matchNode.children());

            }

            break;

          //Escaped wildcard key    
          case '\\*':

            filterKey = '*';

          default:

            for(const matchedNode of matchedNodes.splice(0)){

              if(matchedNode.hasChild(<string>filterKey)){

                matchedNodes.push(matchedNode.getChild(<string>filterKey));

              }

            }

        }

        pathIterResult = pathIter.next()

      }

      for(const matchedNode of matchedNodes){

        if(!yielded.has(matchedNode)){

          yielded.add(matchedNode);

          yield matchedNode;

        }

      }

    }
  
  }
 
  *values(...keyFilters:(string | number)[]):IterableIterator<any>{
    
    for(const keyValueNode of this.keys(...keyFilters)){

      yield keyValueNode.value;

    }
  
  }

  rootKeys():IterableIterator<KeyValueNode>{

    return this[ROOT_KEY_VALUES].values();

  }

  has(key:string | number | String):boolean{

    return this[KEY_VALUE_MAP].has(key.toString());

  }

  *[Symbol.iterator]():IterableIterator<[KeyValueNode, any]>{

     for(const keyValueNode of this[KEY_VALUE_SET]){

       yield [keyValueNode, keyValueNode.value];

     } 

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

}