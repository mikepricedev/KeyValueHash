import {expect} from 'chai';
import KeyValueNode from './KeyValueNode';
import {BaseKeyValueNode} from 'key-value-node';
import PathNotation from 'path-notation';

describe(`KeyValueNode`,()=>{

  describe('Instantiation',()=>{

    it(`Inherites from BaseKeyValueNode`,()=>{

      const keyNode = new KeyValueNode('foo',new Map(), {foo:Symbol()});

      expect(keyNode).to.be.instanceof(BaseKeyValueNode);

    })

  });

  describe('Accessors',()=>{

    describe(`pathNotation`,()=>{

      const rootDoc = {

        foo:{

          bar:{

            baz:Symbol()

          }

        }

      };

      const fooKey = new KeyValueNode('foo', new Map(), rootDoc);
      const fooBarKey = new KeyValueNode('bar',fooKey);
      const fooBarBazKey = new KeyValueNode('baz',fooBarKey);

      const expectedPath = 'foo.bar.baz';

      const pathNotation = fooBarBazKey.pathNotation;

      it(`Returns PathNotation instance of path from root to terminal key.`,()=>{

        expect(pathNotation).to.be.instanceOf(PathNotation);

        expect(pathNotation.toString()).to.equal(expectedPath);

      });

      it(`Caches PathNotation instance after fist call.`,()=>{

        const pathNotation2 = fooBarBazKey.pathNotation;

        expect(pathNotation2).to.equal(pathNotation);

      });

    });

  });

});