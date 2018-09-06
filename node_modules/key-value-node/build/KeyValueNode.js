"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_node_1 = require("key-node");
const VALUE = Symbol();
const DOC = Symbol();
class BaseKeyValueNode extends key_node_1.BaseKeyNode {
    constructor(key, parent, rootDoc) {
        super(key, parent);
        const doc = this.IS_ROOT_KEY ? rootDoc : parent.value;
        if (typeof doc !== 'object' || doc === null) {
            let docStr;
            switch (typeof doc) {
                case "object":
                    docStr = "null";
                    break;
                case "undefined":
                    docStr = "undefined";
                    break;
                default:
                    try {
                        docStr = doc.toString();
                        break;
                    }
                    catch (_a) { }
                    try {
                        docStr = `${doc}`;
                        break;
                    }
                    catch (_b) { }
                    docStr = typeof doc;
            }
            throw new key_node_1.KeyNodeError(`Cannot read property '${key}' of ${docStr}.`, this);
        }
        this[VALUE] = doc[this.key];
        this[DOC] = doc;
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
exports.BaseKeyValueNode = BaseKeyValueNode;
class KeyValueNode extends BaseKeyValueNode {
}
exports.KeyValueNode = KeyValueNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFtRDtBQUVuRCxNQUFNLEtBQUssR0FBaUIsTUFBTSxFQUFFLENBQUM7QUFDckMsTUFBTSxHQUFHLEdBQWlCLE1BQU0sRUFBRSxDQUFDO0FBRW5DLHNCQUFvRSxTQUFRLHNCQUFrQjtJQU81RixZQUFZLEdBQVUsRUFBRSxNQUFpQyxFQUFFLE9BQXVCO1FBRWhGLEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFbkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBb0IsTUFBTyxDQUFDLEtBQUssQ0FBQztRQUUxRSxJQUFHLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFDO1lBRXpDLElBQUksTUFBYSxDQUFDO1lBQ2xCLFFBQVEsT0FBTyxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssUUFBUTtvQkFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUNoQixNQUFNO2dCQUNSLEtBQUssV0FBVztvQkFDZCxNQUFNLEdBQUcsV0FBVyxDQUFDO29CQUNyQixNQUFNO2dCQUNSO29CQUNFLElBQUk7d0JBQ0YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDeEIsTUFBTTtxQkFDUDtvQkFBQyxXQUFNLEdBQUU7b0JBQ1YsSUFBSTt3QkFDRixNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDbEIsTUFBTTtxQkFDUDtvQkFBQyxXQUFNLEdBQUU7b0JBQ1YsTUFBTSxHQUFHLE9BQU8sR0FBRyxDQUFDO2FBQ3ZCO1lBRUQsTUFBTSxJQUFJLHVCQUFZLENBQUMseUJBQXlCLEdBQUcsUUFBUSxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUU3RTtRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFFbEIsQ0FBQztJQUVELFdBQVc7SUFDWCxJQUFJLEdBQUc7UUFFTCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUV6QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBRVAsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckIsQ0FBQztJQUVELElBQUksR0FBRztRQUVMLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLENBQUM7SUFBQSxDQUFDO0NBRUg7QUEvREQsNENBK0RDO0FBRUQsa0JBQTBCLFNBQVEsZ0JBQThCO0NBQUc7QUFBbkUsb0NBQW1FIn0=