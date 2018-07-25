"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_node_1 = require("key-node");
const path_notation_1 = require("path-notation");
const PATH_NOTATION = Symbol();
class KeyNode extends key_node_1.BaseKeyNode {
    get pathNotation() {
        if (this[PATH_NOTATION] === undefined) {
            const pkeys = [this];
            let pKey = this.PARENT;
            while (pKey !== null) {
                pkeys.unshift(pKey);
                pKey = pKey.PARENT;
            }
            this[PATH_NOTATION] = new path_notation_1.default(pkeys);
        }
        return this[PATH_NOTATION];
    }
}
exports.default = KeyNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9LZXlOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQXFDO0FBQ3JDLGlEQUF5QztBQUV6QyxNQUFNLGFBQWEsR0FBaUIsTUFBTSxFQUFFLENBQUM7QUFFN0MsYUFBNkIsU0FBUSxzQkFBb0I7SUFJdkQsSUFBSSxZQUFZO1FBRWQsSUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssU0FBUyxFQUFDO1lBRW5DLE1BQU0sS0FBSyxHQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFL0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUV2QixPQUFNLElBQUksS0FBSyxJQUFJLEVBQUM7Z0JBRWxCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBRXBCO1lBR0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksdUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUUvQztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdCLENBQUM7Q0FHRjtBQTlCRCwwQkE4QkMifQ==