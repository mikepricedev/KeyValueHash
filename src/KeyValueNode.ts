import {BaseKeyValueNode} from 'key-value-node';
import PathNotation from 'path-notation';

const PATH_NOTATION:unique symbol = Symbol('PATH_NOTATION');

export default class KeyValueNode extends BaseKeyValueNode<KeyValueNode>{

  private [PATH_NOTATION]:PathNotation;

  constructor(key:string, parent:KeyValueNode)
  constructor(key:string, parent:Map<string, KeyValueNode>, rootDoc:object | any[])
  constructor(
    key:string,
    parent:KeyValueNode | Map<string, KeyValueNode>,
    rootDoc?:object | any[]
  ){

    super(key, <any>parent, rootDoc);

  }

  //Accessors
  get pathNotation():PathNotation{

    if(this[PATH_NOTATION] === undefined){

      const pkeys:KeyValueNode[] = [this];

      let pKey = this.PARENT;

      while(pKey !== null){

        pkeys.unshift(pKey);

        pKey = pKey.PARENT;

      }


      this[PATH_NOTATION] = new PathNotation(pkeys);

    }

    return this[PATH_NOTATION];

  }


}