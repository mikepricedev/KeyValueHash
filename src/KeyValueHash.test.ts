import {expect} from 'chai';
import KeyValueHash from './KeyValueHash';
import RootKeyNode from './RootKeyNode';

describe(`KeyValueHash`,()=>{

  let obj = {

    foo:{

      bar:Symbol(),
      baz:[
        {qux:Symbol()},
        {qux:Symbol()},
      ]

    },

    quux:[1,2,3]

  }

  let keyValueHash:KeyValueHash<typeof obj>;
  

  beforeEach(()=>{

    obj = {

      foo:{

        bar:Symbol(),
        baz:[
          {qux:Symbol()},
          {qux:Symbol()},
        ]

      },

      quux:[1,2,3]

    }

    keyValueHash = new KeyValueHash(obj);

  })

  describe('Instaniation',()=>{

    it(`Is Iterable<Key, @value>, breadth first key/value hash map of object.`,()=>{

      const expectedPathValues = [
        ['foo',obj.foo],
        ['quux',obj.quux],
        ['foo.bar',obj.foo.bar],
        ['foo.baz',obj.foo.baz],
        ['quux.0',obj.quux[0]],
        ['quux.1',obj.quux[1]],
        ['quux.2',obj.quux[2]],
        ['foo.baz.0',obj.foo.baz[0]],
        ['foo.baz.1',obj.foo.baz[1]],
        ['foo.baz.0.qux',obj.foo.baz[0].qux],
        ['foo.baz.1.qux',obj.foo.baz[1].qux],
      ];

      let i = 0;

      for(const [key, val] of keyValueHash){

        let [path, value] = expectedPathValues[i];

        expect(key).property('dotNotatedPath').to.equal(path);

        expect(val).to.equal(value);

        i++;

      }

      expect(i).to.equal(keyValueHash.size);

    });

  });

  describe('Accessors',()=>{

    describe(`size`,()=>{

      it(`Returns number of key/value pair in the object.`,()=>{

        const expectedKeyValuePairs = 11;

        expect(keyValueHash).property('size').to.equal(expectedKeyValuePairs);

      });

    });

    describe(`srcObject`,()=>{

      it(`Returns source object passed to the constructor.`,()=>{

        expect(keyValueHash).property('srcObject').to.equal(obj);

      });

    });

  });

  describe('Methods',()=>{

    describe(`entries`,()=>{

      it(`Returns IterableIterator<Key, @value>, breadth first key/value hash map of object.`,()=>{

        const expectedPathValues = [
          ['foo',obj.foo],
          ['quux',obj.quux],
          ['foo.bar',obj.foo.bar],
          ['foo.baz',obj.foo.baz],
          ['quux.0',obj.quux[0]],
          ['quux.1',obj.quux[1]],
          ['quux.2',obj.quux[2]],
          ['foo.baz.0',obj.foo.baz[0]],
          ['foo.baz.1',obj.foo.baz[1]],
          ['foo.baz.0.qux',obj.foo.baz[0].qux],
          ['foo.baz.1.qux',obj.foo.baz[1].qux],
        ];

        let i = 0;

        for(const [key, val] of keyValueHash.entries()){

          let [path, value] = expectedPathValues[i];

          expect(key).property('dotNotatedPath').to.equal(path);

          expect(val).to.equal(value);

          i++;

        }

        expect(i).to.equal(keyValueHash.size);

      });

    });

    describe(`keys`,()=>{

      it(`Returns IterableIterator<Key>, breadth first key hash map of object.`,()=>{

        const expectedPathValues = [
          ['foo',obj.foo],
          ['quux',obj.quux],
          ['foo.bar',obj.foo.bar],
          ['foo.baz',obj.foo.baz],
          ['quux.0',obj.quux[0]],
          ['quux.1',obj.quux[1]],
          ['quux.2',obj.quux[2]],
          ['foo.baz.0',obj.foo.baz[0]],
          ['foo.baz.1',obj.foo.baz[1]],
          ['foo.baz.0.qux',obj.foo.baz[0].qux],
          ['foo.baz.1.qux',obj.foo.baz[1].qux],
        ];

        let i = 0;

        for(const key of keyValueHash.keys()){

          let [path] = expectedPathValues[i];

          expect(key).property('dotNotatedPath').to.equal(path);

          i++;

        }

        expect(i).to.equal(keyValueHash.size);

      });

    });

    describe(`keys`,()=>{

      it(`Returns IterableIterator<@value>, breadth first value of keys.`,()=>{

        const expectedPathValues = [
          ['foo',obj.foo],
          ['quux',obj.quux],
          ['foo.bar',obj.foo.bar],
          ['foo.baz',obj.foo.baz],
          ['quux.0',obj.quux[0]],
          ['quux.1',obj.quux[1]],
          ['quux.2',obj.quux[2]],
          ['foo.baz.0',obj.foo.baz[0]],
          ['foo.baz.1',obj.foo.baz[1]],
          ['foo.baz.0.qux',obj.foo.baz[0].qux],
          ['foo.baz.1.qux',obj.foo.baz[1].qux],
        ];

        let i = 0;

        for(const value of keyValueHash.values()){

          let [,val] = expectedPathValues[i];

         

        expect(val).to.equal(value);

          i++;

        }

        expect(i).to.equal(keyValueHash.size);

      });

    });

    describe('rootKeys',()=>{

      it(`Returns IterableIterator<RootKeyNode>, direct keys of object.`,()=>{

        const expectedPathValues = [
          ['foo',obj.foo],
          ['quux',obj.quux],
        ];

        let i = 0;

        for(const rootKey of keyValueHash.rootKeys()){

          let [path] = expectedPathValues[i];

          expect(rootKey).to.be.instanceof(RootKeyNode);

          expect(rootKey).property('dotNotatedPath').to.equal(path);

          i++;

        }

        expect(i).to.equal(Object.keys(obj).length);

      });

    });

    describe('has',()=>{

      it(`Returns true when key node exsists in hash.`,()=>{

        const DNE = new RootKeyNode('DNE',new Set());

        expect(keyValueHash.has(DNE)).to.be.false

        let i = 0;

        for(const key of keyValueHash.keys()){

          expect(keyValueHash.has(key)).to.be.true

          i++;

        }

        expect(i).to.equal(keyValueHash.size);

      });

    });

    describe('get',()=>{

      it(`Returns value at KeyNode.`,()=>{

        const expectedPathValues = [
          ['foo',obj.foo],
          ['quux',obj.quux],
          ['foo.bar',obj.foo.bar],
          ['foo.baz',obj.foo.baz],
          ['quux.0',obj.quux[0]],
          ['quux.1',obj.quux[1]],
          ['quux.2',obj.quux[2]],
          ['foo.baz.0',obj.foo.baz[0]],
          ['foo.baz.1',obj.foo.baz[1]],
          ['foo.baz.0.qux',obj.foo.baz[0].qux],
          ['foo.baz.1.qux',obj.foo.baz[1].qux],
        ];

        let i = 0;

        for(const key of keyValueHash.keys()){

          let [,value] = expectedPathValues[i];

          expect(keyValueHash.get(key)).to.equal(value);

          i++;

        }

        expect(i).to.equal(keyValueHash.size);

      });

    });

  });

});