import {BaseKeyNode} from 'key-node';
import PathNotation from 'path-notation';

const PATH_NOTATION:unique symbol = Symbol();

export default class KeyNode extends BaseKeyNode<KeyNode>{

  private [PATH_NOTATION]:PathNotation;

  get pathNotation():PathNotation{

    if(this[PATH_NOTATION] === undefined){

      const pkeys:KeyNode[] = [this];

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