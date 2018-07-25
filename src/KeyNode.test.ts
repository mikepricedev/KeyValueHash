import {expect} from 'chai';
import KeyNode from './KeyNode';
import {BaseKeyNode} from 'key-node';
import PathNotation from 'path-notation';

describe(`KeyNode`,()=>{

  describe('Instantiation',()=>{

    it(`Inherites from BaseKeyNode`,()=>{

      const keyNode = new KeyNode('foo',new Map());

      expect(keyNode).to.be.instanceof(BaseKeyNode);

    })

  });

  describe('Accessors',()=>{

    describe(`pathNotation`,()=>{

      const fooKey = new KeyNode('foo',new Map());
      const fooBarKey = new KeyNode('bar',fooKey);
      const fooBarBazKey = new KeyNode('baz',fooBarKey);

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