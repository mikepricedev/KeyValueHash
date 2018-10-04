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

  });

  describe(`Accessors`,()=>{

    describe(`key`,()=>{

      it(`Is the 'toString' result of the KeyValueNode.`,()=>{

        expect(keyValNode).property('key').to.equal(keyValNode.toString());

      });

    });

    describe(`value`,()=>{

      it(`Is the value of the key in the doc.`,()=>{

        expect(keyValNode).property('value').to.equal(value);

      });

      it(`Is undefined when rootDoc is NOT a non-null object.`,()=>{

        const notObjs = [
          1,
          'string',
          true,
          null
        ];

        let i = 0;

        for(const nonObj of notObjs){

          keyValNode = new KeyValueNode(key, new Map(), <any>nonObj);

          expect(keyValNode).property('value').to.be.undefined;

          i++;

        }

        if(i == 0){

          throw new Error(`Test did NOT run.`);

        }

      });

      it(`Is undefined when parent KeyValueNode.value is NOT a non-null object.`,()=>{

        const notObjs = [
          1,
          'string',
          true,
          null
        ];

        let i = 0;

        for(const nonObj of notObjs){

          rootDoc = {foo:nonObj};
          keyValNode = new KeyValueNode(key, new Map(), rootDoc);

          const childKeyValNode = new KeyValueNode('bar', keyValNode);

          expect(childKeyValNode).property('value').to.be.undefined;

          i++;

        }

        if(i == 0){

          throw new Error(`Test did NOT run.`);
          

        }

      });

    });

    describe(`doc`,()=>{

      it(`Is the document containing the key/value.`,()=>{

        expect(keyValNode).property('doc').to.equal(rootDoc);

      });

      it(`Is the value of the parent-KeyValueNode when KeyValueNode is not a root.`,()=>{

        let fooVal = {bar:value};
        rootDoc = {foo:fooVal};
        let rootKeyValNode = new KeyValueNode(key, new Map(), rootDoc);

        let keyValNode = new KeyValueNode('bar',rootKeyValNode);

        expect(keyValNode).property('doc').to.equal(fooVal);

      });

      it(`Returns undefined when rootDoc is NOT a non-null object.`,()=>{

        const notObjs = [
          1,
          'string',
          true,
          null
        ];

        let i = 0;

        for(const nonObj of notObjs){

          keyValNode = new KeyValueNode(key, new Map(), <any>nonObj);

          expect(keyValNode).property('doc').to.be.undefined;

          i++;

        }

        if(i == 0){

          throw new Error(`Test did NOT run.`);

        }

      });

      it(`Is undefined when parent KeyValueNode.value is NOT a non-null object.`,()=>{

        const notObjs = [
          1,
          'string',
          true,
          null
        ];

        let i = 0;

        for(const nonObj of notObjs){

          rootDoc = {foo:nonObj};
          keyValNode = new KeyValueNode(key, new Map(), rootDoc);

          const childKeyValNode = new KeyValueNode('bar', keyValNode);

          expect(childKeyValNode).property('doc').to.be.undefined;

          i++;

        }

        if(i == 0){

          throw new Error(`Test did NOT run.`);
          
        }

      });

    });

  });

});