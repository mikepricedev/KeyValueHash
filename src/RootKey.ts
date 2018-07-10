import Key from './Key';

const ROOT_KEYS:unique symbol = Symbol();

export default class RootKey extends Key {

  private readonly [ROOT_KEYS]:Set<RootKey>;

  constructor(key:string, rootKeys:Set<RootKey>){

    super(key);

    rootKeys.add(this);

    this[ROOT_KEYS] = rootKeys;

  }

  *siblings():IterableIterator<Key>{

    for(const sib of this[ROOT_KEYS]){

      if(sib !== this){

        yield sib;

      }

    }

  }

}