"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_value_node_1 = require("key-value-node");
const path_notation_1 = require("path-notation");
const PATH_NOTATION = Symbol('PATH_NOTATION');
class KeyValueNode extends key_value_node_1.BaseKeyValueNode {
    constructor(key, parent, rootDoc) {
        super(key, parent, rootDoc);
    }
    //Accessors
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
exports.default = KeyValueNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUFnRDtBQUNoRCxpREFBeUM7QUFFekMsTUFBTSxhQUFhLEdBQWlCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU1RCxrQkFBa0MsU0FBUSxpQ0FBOEI7SUFNdEUsWUFDRSxHQUFVLEVBQ1YsTUFBK0MsRUFDL0MsT0FBdUI7UUFHdkIsS0FBSyxDQUFDLEdBQUcsRUFBTyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFbkMsQ0FBQztJQUVELFdBQVc7SUFDWCxJQUFJLFlBQVk7UUFFZCxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxTQUFTLEVBQUM7WUFFbkMsTUFBTSxLQUFLLEdBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUV2QixPQUFNLElBQUksS0FBSyxJQUFJLEVBQUM7Z0JBRWxCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBRXBCO1lBR0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksdUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUUvQztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdCLENBQUM7Q0FHRjtBQTNDRCwrQkEyQ0MifQ==