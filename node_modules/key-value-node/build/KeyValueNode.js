"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
"use strict";
const key_node_1 = require("key-node");
const VALUE = Symbol();
const DOC = Symbol();
class BaseKeyValueNode extends key_node_1.BaseKeyNode {
    constructor(key, parent, rootDoc) {
        super(key, parent);
        this[_a] = undefined;
        this[_b] = undefined;
        const doc = this.IS_ROOT_KEY ? rootDoc : parent.value;
        if (typeof doc === 'object' && doc !== null) {
            this[VALUE] = doc[this.key];
            this[DOC] = doc;
        }
    }
    //Accessors
    get key() {
        return this.toString();
    }
    get value() {
        return this[VALUE];
    }
    get doc() {
        return this[DOC];
    }
    ;
}
_a = VALUE, _b = DOC;
exports.BaseKeyValueNode = BaseKeyValueNode;
class KeyValueNode extends BaseKeyValueNode {
}
exports.KeyValueNode = KeyValueNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsdUNBQW1EO0FBRW5ELE1BQU0sS0FBSyxHQUFpQixNQUFNLEVBQUUsQ0FBQztBQUNyQyxNQUFNLEdBQUcsR0FBaUIsTUFBTSxFQUFFLENBQUM7QUFFbkMsc0JBQW9FLFNBQVEsc0JBQWtCO0lBTzVGLFlBQVksR0FBVSxFQUFFLE1BQWlDLEVBQUUsT0FBdUI7UUFFaEYsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQVBKLFFBQU8sR0FBTyxTQUFTLENBQUM7UUFDeEIsUUFBSyxHQUFrQixTQUFTLENBQUM7UUFRaEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBb0IsTUFBTyxDQUFDLEtBQUssQ0FBQztRQUUxRSxJQUFHLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFDO1lBRXpDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FFakI7SUFFSCxDQUFDO0lBRUQsV0FBVztJQUNYLElBQUksR0FBRztRQUVMLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXpCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFFUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyQixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBRUwsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbkIsQ0FBQztJQUFBLENBQUM7Q0FFSDtLQXZDbUIsS0FBSyxPQUNMLEdBQUc7QUFIdkIsNENBeUNDO0FBRUQsa0JBQTBCLFNBQVEsZ0JBQThCO0NBQUc7QUFBbkUsb0NBQW1FIn0=