import {expect} from 'chai';
import {KeyValueNode} from './KeyValueNode';
import {BaseKeyNode, KeyNodeError} from 'key-node';

describe(`KeyValueNode`,()=>{

  let key:string;
  let value:symbol;
  let rootDoc:{foo:any};
  let keyValNode:KeyValueNode;

  beforeEach(()=>{

    key = 'foo';
    value = Symbol();
    rootDoc = {foo:value};
    keyValNode = new KeyValueNode(key, new Map(), rootDoc);

  });

  describe(`Instantiation`,()=>{

    it(`Inherits from BaseKeyNode`,()=>{

      expect(keyValNode).to.be.instanceof(BaseKeyNode);

    });

    it(`Should throw KeyNodeError if doc is not a non-null object.`,()=>{

      const notObjs = [
        1,
        'string',
        true,
        null
      ];

      for(const nonObj of notObjs){

        const throws = ()=> keyValNode = new KeyValueNode(key, new Map(), <any>nonObj);

        expect(throws).to.throw(KeyNodeError);
        expect(throws).to.throw(`Cannot read property`);

      }

    })

  });

  describe(`Properties`,()=>{

    describe(`VALUE`,()=>{

      it(`Is the value of the key in the doc.`,()=>{

        expect(keyValNode).property('VALUE').to.equal(value);

      });

    });

    describe(`DOC`,()=>{

      it(`Is the document containing the key/value.`,()=>{

        expect(keyValNode).property('DOC').to.equal(rootDoc);

      });

      it(`Is the value of the parent-KeyValueNode when KeyValueNode is not a root.`,()=>{

        let fooVal = {bar:value};
        rootDoc = {foo:fooVal};
        let rootKeyValNode = new KeyValueNode(key, new Map(), rootDoc);

        let keyValNode = new KeyValueNode('bar',rootKeyValNode);

        expect(keyValNode).property('DOC').to.equal(fooVal);

      });

    });

  });

  describe(`Accessors`,()=>{

    describe(`key`,()=>{

      it(`Is the 'toString' result of the KeyValueNode.`,()=>{

        expect(keyValNode).property('key').to.equal(keyValNode.toString());

      });

    });

  });

});