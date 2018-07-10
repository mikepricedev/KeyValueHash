import {expect} from 'chai';
import KeyNode from './KeyNode';
import RootKeyNode from './RootKeyNode';


describe(`RootKeyNode`,()=>{

  let rootKeys = new Set();
  
  let fooKey = new RootKeyNode('foo', rootKeys);
  let barKey = new RootKeyNode('bar', rootKeys);

  before(()=>{

    rootKeys = new Set();
  
    fooKey = new RootKeyNode('foo', rootKeys);
    barKey = new RootKeyNode('bar', rootKeys);

  })

  describe('Instaniation',()=>{

    it(`Extends 'Key'.`,()=>{

      expect(fooKey).to.be.instanceof(KeyNode);

    });

  });

  describe('Accessors',()=>{

    describe('parent',()=>{

      it('Always returns null',()=>{

        expect(fooKey).property('parent').to.be.null;
        expect(barKey).property('parent').to.be.null;

      });

    });

  });

  describe('Methods',()=>{

    describe('siblings',()=>{

      it(`Returns IterableIterator<Key> of sibling keys.`,()=>{

        expect(Array.from(fooKey.siblings())).deep.equal([barKey]);
        expect(Array.from(barKey.siblings())).deep.equal([fooKey]);

      });

    });

  });

});