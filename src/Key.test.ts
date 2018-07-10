import {expect} from 'chai';
import Key from './Key';


describe(`Key`,()=>{

  let fooKey = new Key('foo');
  let fooBarKey = new Key('bar', fooKey);
  let fooBazKey = new Key('baz', fooKey);
  let fooBarQuxKey = new Key('qux', fooBarKey);

  before(()=>{

    fooKey = new Key('foo');
    fooBarKey = new Key('bar', fooKey);
    fooBazKey = new Key('baz', fooKey);
    fooBarQuxKey = new Key('qux', fooBarKey);

  })

  describe('Instaniation',()=>{

    it(`Extends 'String'.`,()=>{

      expect(fooKey).to.be.instanceof(String);

    });

  });

  describe('Accessors',()=>{

    describe(`isRootKey`,()=>{

      it(`Returns true when key does not have parent and false when it has parent.`,()=>{

        expect(fooKey).property('isRootKey').to.be.true;
        expect(fooBazKey).property('isRootKey').to.be.false;

      });

    });

    describe(`parent`,()=>{

      it(`Returns parent key.`,()=>{

        expect(fooKey).property('parent').to.be.null;
        expect(fooBazKey).property('parent').to.equal(fooKey);

      });

    });

    describe(`dotNotatedPath`,()=>{

      it(`Returns path to and including key in dot notation.`,()=>{

        expect(fooKey).property('dotNotatedPath').to.equal('foo');
        expect(fooBazKey).property('dotNotatedPath').to.equal('foo.baz');
        expect(fooBarQuxKey).property('dotNotatedPath').to.equal('foo.bar.qux');

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

  });

  describe('Methods',()=>{

    describe('path',()=>{

      it(`Returns IterableIterator<Key> of parent paths from root to and including key.`,()=>{

        expect(Array.from(fooKey.path())).deep.equal([fooKey]);
        expect(Array.from(fooBazKey.path())).deep.equal([fooKey, fooBazKey]);
        expect(Array.from(fooBarKey.path())).deep.equal([fooKey, fooBarKey]);
        expect(Array.from(fooBarQuxKey.path())).deep.equal([fooKey, fooBarKey, fooBarQuxKey]);

      });

    });

    describe('children',()=>{

      it(`Returns IterableIterator<Key> of direct children keys.`,()=>{

        expect(Array.from(fooKey.children())).deep.equal([fooBarKey, fooBazKey]);
        expect(Array.from(fooBarKey.children())).deep.equal([fooBarQuxKey]);

      });

    });

    describe('siblings',()=>{

      it(`Returns IterableIterator<Key> of sibling keys (when Key is NOT root key).`,()=>{

        expect(Array.from(fooBarKey.siblings())).deep.equal([fooBazKey]);
        expect(Array.from(fooKey.siblings())).have.lengthOf(0);

      });

    });

  });

});