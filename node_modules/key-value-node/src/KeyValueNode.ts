import {BaseKeyNode, KeyNodeError} from 'key-node';

const VALUE:unique symbol = Symbol();
const DOC:unique symbol = Symbol();

export class BaseKeyValueNode<Tself extends BaseKeyValueNode = any> extends BaseKeyNode<Tself>{

  private readonly [VALUE]:any = undefined;
  private readonly [DOC]:object | any[] = undefined;

  constructor(key:string, parent:Tself)
  constructor(key:string, parent:Map<string, Tself>, rootDoc:object | any[])
  constructor(key:string, parent:Tself | Map<string, Tself>, rootDoc?:object | any[]){

    super(key, parent);

    const doc = this.IS_ROOT_KEY ? rootDoc : (<BaseKeyValueNode>parent).value;

    if(typeof doc === 'object' && doc !== null){

      this[VALUE] = doc[this.key];
      this[DOC] = doc;

    }

  }

  //Accessors
  get key():string{

    return this.toString();

  }

  get value():any {

    return this[VALUE];

  }

  get doc():object | any[]{

    return this[DOC];

  };

}

export class KeyValueNode extends BaseKeyValueNode<KeyValueNode> {}