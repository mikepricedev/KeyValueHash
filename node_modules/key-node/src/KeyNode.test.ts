import {expect} from 'chai';
import PathNotation from 'path-notation';
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

    describe('rootKey',()=>{

      it(`Returns the root KeyNode of from the KeyNode's path.`,()=>{

        expect(fooBazKey).property('rootKey').to.equal(fooKey);
        expect(fooBarQuxKey).property('rootKey').to.equal(fooKey);

      });

      it(`Returns self if KeyNode is root key.`,()=>{

        expect(fooKey).property('IS_ROOT_KEY').to.be.true;
        expect(fooKey).property('rootKey').to.equal(fooKey);

      });

    });

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

    describe(`pathNotation`,()=>{

      const rootDoc = {

        foo:{

          bar:{

            baz:Symbol()

          }

        }

      };

      const fooKey = new KeyNode('foo', new Map());
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

    describe(`pathTokey`,()=>{

      it(`Returns IterableIterator<Key> of keys from the root to and including the current Key.`,
        ()=>{

          expect(Array.from(fooBarQuxKey.pathToKey())).to.deep.equal([
            fooKey,
            fooBarKey,
            fooBarQuxKey
          ]);

      });

      it(`Optionally does not inlcuded current Key if false is passed.`,()=>{

        expect(Array.from(fooBarQuxKey.pathToKey(false))).to.deep.equal([
          fooKey,
          fooBarKey
        ]);

      });

      it(`Root Key(s) yield self or nothing if false is passed.`,()=>{

        expect(Array.from(fooKey.pathToKey())).to.deep.equal([fooKey]);
        expect(Array.from(fooKey.pathToKey(false))).to.have.lengthOf(0);

      });

    });

  });

});