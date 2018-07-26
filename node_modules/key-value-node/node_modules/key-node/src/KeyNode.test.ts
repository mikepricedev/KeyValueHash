import {expect} from 'chai';
import {KeyNode} from './KeyNode';
import KeyNodeError from './KeyNodeError';

describe(`KeyNode`,()=>{

  let rootKeyLib = new Map<string, KeyNode>();

  let fooKey = new KeyNode('foo', rootKeyLib);
  let fooBarKey = new KeyNode('bar', fooKey);
  let fooBazKey = new KeyNode('baz', fooKey);
  let fooBarQuxKey = new KeyNode('qux', fooBarKey);

  beforeEach(()=>{

    rootKeyLib = new Map<string, KeyNode>();

    fooKey = new KeyNode('foo', rootKeyLib);
    fooBarKey = new KeyNode('bar', fooKey);
    fooBazKey = new KeyNode('baz', fooKey);
    fooBarQuxKey = new KeyNode('qux', fooBarKey);

  });

  describe('Instaniation',()=>{

    it(`Extends 'String'.`,()=>{

      expect(fooKey).to.be.instanceof(String);

    });

    it(`Throws KeyNodeError if sibling key literal already exists.`,()=>{

      const throws = ()=> new KeyNode('bar', fooKey);

      expect(throws).to.throw(KeyNodeError);
      expect(throws).to.throw(`Sibling key literals must be unique.`);

    });

    it(`Throws KeyNodeError if sibling root key literal already exists.`,()=>{

      const throws = ()=> new KeyNode('foo', rootKeyLib);

      expect(throws).to.throw(KeyNodeError);
      expect(throws).to.throw(`Sibling key literals must be unique.`);

    });

  });

  describe(`Properties`,()=>{


    describe(`IS_ROOT_KEY`,()=>{

      it(`Returns true when key does not have parent and false when it has parent.`,()=>{

        expect(fooKey).property('IS_ROOT_KEY').to.be.true;
        expect(fooBazKey).property('IS_ROOT_KEY').to.be.false;

      });

    });

  });

  describe('Accessors',()=>{

    describe(`isTerminalKey`,()=>{

      it(`Returns true when key does not have children and false when it has children.`,()=>{

        expect(fooKey).property('isTerminalKey').to.be.false;
        expect(fooBarKey).property('isTerminalKey').to.be.false;
        expect(fooBazKey).property('isTerminalKey').to.be.true;
        expect(fooBarQuxKey).property('isTerminalKey').to.be.true;


      });

    });

    describe(`numChildren`,()=>{

      it(`Returns number of children keys.`,()=>{

        expect(fooKey).property('numChildren').to.equal(2);
        expect(fooBazKey).property('numChildren').to.equal(0);
        expect(fooBarKey).property('numChildren').to.equal(1);
        expect(fooBarQuxKey).property('numChildren').to.equal(0);

      });

    });

    describe(`depth`,()=>{

      it(`Returns node depth of key.`,()=>{

        expect(fooKey).property('depth').to.equal(0);
        expect(fooBazKey).property('depth').to.equal(1);
        expect(fooBarKey).property('depth').to.equal(1);
        expect(fooBarQuxKey).property('depth').to.equal(2);

      });

    });

  });

  describe('Methods',()=>{

    describe('hasChild',()=>{

      it(`Returns true if KeyNode has child key.`,()=>{

        expect(fooKey.hasChild('bar')).to.be.true;
        expect(fooBarQuxKey.hasChild('quux')).to.be.false;

      });

    });

    describe('getChild',()=>{

      it(`Returns child KeyNode.`,()=>{

        expect(fooKey.getChild('bar')).to.equal(fooBarKey);

      });

      it(`Returns null if child KeyNode DNE.`,()=>{

        expect(fooKey.getChild('DNE')).to.be.null;

      });

    });

    describe('hasSibling',()=>{

      it(`Returns true if KeyNode has sibling key.`,()=>{

        expect(fooBazKey.hasSibling('bar')).to.be.true;
        expect(fooBarQuxKey.hasSibling('quux')).to.be.false;

      });

    });

    describe('getSibling',()=>{

      it(`Returns sibling KeyNode.`,()=>{

        expect(fooBazKey.getSibling('bar')).to.equal(fooBarKey);

      });

      it(`Returns null if sibling KeyNode DNE.`,()=>{

        expect(fooKey.getSibling('DNE')).to.be.null;

      });

    });

    describe('children',()=>{

      it(`Returns IterableIterator<Key> of direct children keys.`,()=>{

        expect(Array.from(fooKey.children())).deep.equal([fooBarKey, fooBazKey]);
        expect(Array.from(fooBarKey.children())).deep.equal([fooBarQuxKey]);

      });

    });

    describe(`parents`,()=>{

      it(`Returns IterableIterator<Key> of parent keys to root key.`,()=>{

        expect(Array.from(fooBarQuxKey.parents())).deep.equal([fooBarKey, fooKey]);

      });

    });

    describe('siblings',()=>{

      it(`Returns IterableIterator<Key> of sibling keys.`,()=>{

        expect(Array.from(fooBarKey.siblings())).deep.equal([fooBazKey]);
        expect(Array.from(fooKey.siblings())).have.lengthOf(0);

      });

      it(`Returns IterableIterator<Key> of silbling keys of root keys.`,()=>{

        rootKeyLib = new Map();

        fooKey = new KeyNode('foo', rootKeyLib);

        let barKey = new KeyNode('bar', rootKeyLib);
        let bazKey = new KeyNode('baz', rootKeyLib);

        expect([...fooKey.siblings()]).have.ordered.members([barKey, bazKey]);

      });

    });



  });

});