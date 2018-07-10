"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KeyNode_1 = require("./KeyNode");
const ROOT_KEYS = Symbol();
class RootKeyNode extends KeyNode_1.default {
    constructor(key, rootKeys) {
        super(key);
        rootKeys.add(this);
        this[ROOT_KEYS] = rootKeys;
    }
    *siblings() {
        for (const sib of this[ROOT_KEYS]) {
            if (sib !== this) {
                yield sib;
            }
        }
    }
}
exports.default = RootKeyNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vdEtleU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUm9vdEtleU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0M7QUFFaEMsTUFBTSxTQUFTLEdBQWlCLE1BQU0sRUFBRSxDQUFDO0FBRXpDLGlCQUFpQyxTQUFRLGlCQUFPO0lBSTlDLFlBQVksR0FBVSxFQUFFLFFBQXlCO1FBRS9DLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVYLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUU3QixDQUFDO0lBRUQsQ0FBQyxRQUFRO1FBRVAsS0FBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUM7WUFFL0IsSUFBRyxHQUFHLEtBQUssSUFBSSxFQUFDO2dCQUVkLE1BQU0sR0FBRyxDQUFDO2FBRVg7U0FFRjtJQUVILENBQUM7Q0FFRjtBQTVCRCw4QkE0QkMifQ==