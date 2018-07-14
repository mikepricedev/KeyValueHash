const KEYS_KEY:unique symbol = Symbol();

export default class Path extends String {

  private readonly [KEYS_KEY]:string[];

  constructor(
    pathOrKey:string | number | String | Iterable<string | number | String>, 
    ...keys:(string | number | String)[]
  ){

    const keysToSet:string[] = [];

    switch(typeof pathOrKey){

      case 'string':

        keysToSet.push(...Path.pathNotationToKeys(<string>pathOrKey));
        break;

      case 'number':

        keysToSet.push(...Path.pathNotationToKeys(pathOrKey.toString()));
        break;

      default:

        if(pathOrKey instanceof String && !(pathOrKey instanceof Path)){

          keysToSet.push(pathOrKey.toString());
          break;

        }

        for(const keyLiteral of <Iterable<string | number>>pathOrKey){

          keysToSet.push(keyLiteral.toString());

        }

    }

    for(const keyLiteral of keys){

      keysToSet.push(keyLiteral.toString());

    }

    super(Path.keysToPathNotation(keysToSet));

    this[KEYS_KEY] = keysToSet;

  }

  //Accessors
  get numKeys(){

    return this[KEYS_KEY].length;

  }

  get depth(){

    return this[KEYS_KEY].length - 1;

  }

  get rootKey(){

    return this[KEYS_KEY][0];

  }

  get terminalKey(){

    return this[KEYS_KEY][this.depth];

  }

  get [Symbol.toStringTag]() {
  
    return this.constructor.name;
  
  }

  //Methods
  *keys(){

    let i = 0;

    for(let key of this[KEYS_KEY]){

      i++;

      let remainingPath = yield key;

      while(remainingPath === true){

        remainingPath = yield Path.keysToPathNotation(this[KEYS_KEY].slice(i));

      }

    }

  }

  parentPath(keyDepth:number):Path{

    const DEPTH = this.depth;

    if(keyDepth >= DEPTH){

      throw new Error(`A parent 'Path.depth' must be less than it's children 'Path.depth(s)'.`);

    }

    return new Path(this[KEYS_KEY].slice(0, keyDepth + 1));

  }

  *[Symbol.iterator]():IterableIterator<string>{

    yield* this[KEYS_KEY];

  }

  static *pathNotationToKeys(path:string):IterableIterator<string>{

    const escapedKeys:Map<string, string> = new Map();

    //["@key"]
    path = path.replace(/\["(.+)"\]/g, (m, key)=>{

      let placeHolder:string;
      
      do {

        placeHolder = `{%${Math.floor(Math.random()*10**4)}%}`;

      } while(escapedKeys.has(placeHolder));

      escapedKeys.set(placeHolder, key);

      return `.${placeHolder}.`;

    });

    //['@key']
    path = path.replace(/\['(.+)'\]/g, (m, key)=>{

      let placeHolder:string;
      
      do {

        placeHolder = `{%${Math.floor(Math.random()*10**4)}%}`;

      } while(escapedKeys.has(placeHolder));

      escapedKeys.set(placeHolder, key);

      return `.${placeHolder}.`;

    });

    //Remove trailing '.'
    if(path.slice(-1) === '.'){

      path = path.slice(0, -1);

    }

    for(let key of path.split('.')){

      yield escapedKeys.has(key) ? escapedKeys.get(key) : key;

    }

  }

  static keysToPathNotation(keys:Iterable<string>):string{

    let pathNotation = '';

    let lastWasBracketNotation = false;

    for(let key of keys){

      if(key.indexOf('.') > -1){

        pathNotation += `["${key}"]`;

        lastWasBracketNotation = true;

      } else if(lastWasBracketNotation){

        pathNotation += `${key}`;

        lastWasBracketNotation = false;

      } else {

        pathNotation += `.${key}`;

      }

    }

    //Remove leading "."
    return pathNotation.slice(1);

  }
  
}