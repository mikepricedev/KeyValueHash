import {expect} from 'chai';
import Key from './Key';
import RootKey from './RootKey';


describe(`RootKey`,()=>{

  let rootKeys = new Set();
  
  let fooKey = new RootKey('foo', rootKeys);
  let barKey = new RootKey('bar', rootKeys);

  before(()=>{

    rootKeys = new Set();
  
    fooKey = new RootKey('foo', rootKeys);
    barKey = new RootKey('bar', rootKeys);

  })

  describe('Instaniation',()=>{

    it(`Extends 'Key'.`,()=>{

      expect(fooKey).to.be.instanceof(Key);

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