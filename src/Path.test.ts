import {expect} from 'chai';
import Path from './Path';

describe('Path',()=>{

  describe('Static Methods',()=>{

    describe('pathNotationToKeys',()=>{

      it(`Returns an 'IterableIterator' of keys from dot-notated path string.`,()=>{

        const pathStr = 'foo.bar';

        const result = Path.pathNotationToKeys(pathStr);

        expect(result).to.have.property('next');

        expect(Array.from(result)).to.deep.eq(pathStr.split('.'));

      });

      it(`Reads anything in square brackets and double quotes as a key i.e. 
          in 'foo["bar.baz"]'. bar.baz is a key.`,()=>{

        const pathStr = 'foo["bar.baz"]';

        const result = Array.from(Path.pathNotationToKeys(pathStr));

        expect(result[1]).to.eq('bar.baz');

      });

      it(`Reads anything in square brackets and single quotes as a key i.e. 
          in "foo['bar.baz']". bar.baz is a key.`,()=>{

        const pathStr = "foo['bar.baz']";

        const result = Array.from(Path.pathNotationToKeys(pathStr));

        expect(result[1]).to.eq('bar.baz');

      });

    });

    describe('keysToPathNotation',()=>{

      it(`Returns a dot-notated path string from an 'Iterable' of string keys.`,()=>{

        const pathKeys = ['foo','bar'];

        expect(Path.keysToPathNotation(pathKeys)).to.eq(pathKeys.join('.'));


      });

      it(`Adds square bracket double quote notion to keys with "." in them.`,()=>{

         const pathKeys = ['foo','bar.baz.qux'];

         expect(Path.keysToPathNotation(pathKeys)).to.eq('foo["bar.baz.qux"]');

      });

    });


  });

  describe('Instantiation',()=>{

    it(`Extends 'String'.`,()=>{

      const pathStr = 'foo.bar';

      const path = new Path(pathStr);

      expect(path).to.be.instanceof(String);

      expect(path+'').to.eq(pathStr);

    });

    it(`toString() adds square bracket notation to path if key has "." in it.`,()=>{

      const pathKeys = ['foo','bar', 'baz.qux'];

      const path = new Path(pathKeys);

      expect(path.toString()).to.equal('foo.bar["baz.qux"]');

    });

    it(`valueOf() adds square bracket notation to path if key has "." in it.`,()=>{

      const pathKeys = ['foo','bar', 'baz.qux'];

      const path = new Path(pathKeys);

      expect(path.valueOf()).to.equal('foo.bar["baz.qux"]');

    });

    it(`Accepts dot-notated string as constructor arg.`,()=>{

      const pathStr = 'foo.bar';

      const path = new Path(pathStr);

      expect(Array.from(path)).to.deep.equal(pathStr.split('.'));


    });

    it(`Accepts 'Iterable' of strings as constructor arg.`,()=>{

      const pathKeys = ['foo','bar'];

      const path = new Path(pathKeys);

      expect(path.toString()).to.equal(pathKeys.join('.'));

    });

    it(`Accepts 2ndArg...nArg constructor of strings to append to 1st constructor arg.`,()=>{

      const firstArgs = [
        'foo.bar',
        ['foo','bar'],
        new Path('foo.bar'),
      ];

      const prependKeys = [
        'baz',
        'qux'
      ];

      const expectedKeys = ['foo','bar',...prependKeys];

      let testRan = 0;

      for(const FIRST_ARG of firstArgs){

        expect([...(new Path(FIRST_ARG, ...prependKeys))]).to.deep.equal(expectedKeys);

        testRan++;

      };

      expect(testRan).to.equal(firstArgs.length);

    });

    it(`Is 'Iterable' of path keys.`,()=>{

      const pathKeys = ['foo','bar', 'baz.qux'];

      const path = new Path(pathKeys);

      expect(Array.from(path)).to.deep.equal(pathKeys);

    });

  });

  describe('Accessors',()=>{

    const pathKeys = ['foo','bar','qux'];

    const path = new Path(pathKeys.join('.'));

    describe('numKeys',()=>{

      it('Returns number of keys in the path.',()=>{

        expect(path).property('numKeys').to.eq(pathKeys.length);

      });

    });

    describe('depth',()=>{

      it('Returns the zero based depth of the terminal key in the path.',()=>{

        expect(path).property('depth').to.eq(pathKeys.length - 1);

      });

    });

    describe('rootKey',()=>{

      it('Returns the first key in the path.',()=>{

        expect(path).property('rootKey').to.eq(pathKeys[0]);

      });

    });

    describe('terminalKey',()=>{

      it('Returns the last key in the path.',()=>{

        expect(path).property('terminalKey').to.eq(pathKeys[pathKeys.length -1]);

      });

    });

  });

  describe('Methods',()=>{

    const pathKeys = ['foo','bar','qux'];

    const path = new Path(pathKeys.join('.'));

    describe('keys',()=>{

      it(`Returns an 'IterableIterator' of keys from the path.`,()=>{

        const result = path.keys();

        expect(result).to.have.property('next');

        expect(Array.from(result)).to.deep.eq(pathKeys);


      });

    });

    describe('parentPath',()=>{

      it(`Returns parent 'Path' based on the passed depth.`,()=>{

        const result = path.parentPath(1);

        expect(result).to.be.instanceof(Path);

        expect(result.toString()).to.eq(pathKeys.slice(0,2).join('.'));


      });

      it(`Throws 'Error' if requested depth is greather than 'Path.depth'.`,()=>{

        expect(()=>{

          path.parentPath(pathKeys.length);

        }).to.throw(Error);


      });

    });

    describe('childPath',()=>{/*

      it(`Returns child 'Path' from passed child path.`,()=>{

        const childPathKeys = ['quux','quuz']

        const result = path.childPath(childPathKeys.join('.'));

        expect(result).to.be.instanceof(Path);

        expect(result.toString())
          .to
          .eq(Path.keysToPathNotation(yieldIterableValues(path, childPathKeys)));


      });

      it(`Accepts dot-notated child path string, 'Iterable' of keys, or another 'Path'.`,()=>{

        const childPathKeys = ['quux','quuz']

        let result = path.childPath(childPathKeys.join('.'));

        expect(result.toString())
          .to
          .eq(Path.keysToPathNotation(yieldIterableValues(path, childPathKeys)));

        result = path.childPath(childPathKeys);

        expect(result.toString())
          .to
          .eq(Path.keysToPathNotation(yieldIterableValues(path, childPathKeys)));

        result = path.childPath(new Path(childPathKeys));

        expect(result.toString())
          .to
          .eq(Path.keysToPathNotation(yieldIterableValues(path, childPathKeys)));


      });

    */});

  });


});




















