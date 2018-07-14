import {expect} from 'chai';
import KeyNode from './KeyNode';
import Path from './Path';


describe(`KeyNode`,()=>{

  let fooKey = new KeyNode('foo');
  let fooBarKey = new KeyNode('bar', fooKey);
  let fooBazKey = new KeyNode('baz', fooKey);
  let fooBarQuxKey = new KeyNode('qux', fooBarKey);

  before(()=>{

    fooKey = new KeyNode('foo');
    fooBarKey = new KeyNode('bar', fooKey);
    fooBazKey = new KeyNode('baz', fooKey);
    fooBarQuxKey = new KeyNode('qux', fooBarKey);

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

    describe(`isTerminalKey`,()=>{

      it(`Returns true when key does not have children and false when it has children.`,()=>{

        expect(fooKey).property('isTerminalKey').to.be.false;
        expect(fooBarKey).property('isTerminalKey').to.be.false;
        expect(fooBazKey).property('isTerminalKey').to.be.true;
        expect(fooBarQuxKey).property('isTerminalKey').to.be.true;


      });

    });

    describe(`parent`,()=>{

      it(`Returns parent key.`,()=>{

        expect(fooKey).property('parent').to.be.null;
        expect(fooBazKey).property('parent').to.equal(fooKey);

      });

    });

    describe('path',()=>{

      it(`Returns 'Path' instance representing path to key from root to and including key.`,()=>{

        expect(fooKey).property('path').to.be.instanceof(Path);
        expect(fooKey.path.toString()).deep.equal('foo');

        expect(fooBazKey).property('path').to.be.instanceof(Path);
        expect(fooBazKey.path.toString()).deep.equal('foo.baz');

        expect(fooBarKey).property('path').to.be.instanceof(Path);
        expect(fooBarKey.path.toString()).deep.equal('foo.bar');

        expect(fooBarQuxKey).property('path').to.be.instanceof(Path);
        expect(fooBarQuxKey.path.toString()).deep.equal('foo.bar.qux');

      });

      it(`Caches 'Path' instance and returns same instance on subsquent gets.`,()=>{

        const path = fooBarQuxKey.path;

        expect(fooBarQuxKey).property('path').to.equal(path);

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