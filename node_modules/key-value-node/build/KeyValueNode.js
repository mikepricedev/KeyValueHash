"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_node_1 = require("key-node");
class BaseKeyValueNode extends key_node_1.BaseKeyNode {
    constructor(key, parent, rootDoc) {
        super(key, parent);
        const doc = this.IS_ROOT_KEY ? rootDoc : parent.VALUE;
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
        this.VALUE = doc[this.key];
        this.DOC = doc;
    }
    //Accessors
    get key() {
        return this.toString();
    }
}
exports.BaseKeyValueNode = BaseKeyValueNode;
class KeyValueNode extends BaseKeyValueNode {
}
exports.KeyValueNode = KeyValueNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5VmFsdWVOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleVZhbHVlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFtRDtBQUVuRCxzQkFBb0UsU0FBUSxzQkFBa0I7SUFPNUYsWUFBWSxHQUFVLEVBQUUsTUFBaUMsRUFBRSxPQUF1QjtRQUVoRixLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRW5CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQW9CLE1BQU8sQ0FBQyxLQUFLLENBQUM7UUFFMUUsSUFBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLElBQUksRUFBQztZQUV6QyxJQUFJLE1BQWEsQ0FBQztZQUNsQixRQUFRLE9BQU8sR0FBRyxFQUFFO2dCQUNsQixLQUFLLFFBQVE7b0JBQ1gsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDaEIsTUFBTTtnQkFDUixLQUFLLFdBQVc7b0JBQ2QsTUFBTSxHQUFHLFdBQVcsQ0FBQztvQkFDckIsTUFBTTtnQkFDUjtvQkFDRSxJQUFJO3dCQUNGLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ3hCLE1BQU07cUJBQ1A7b0JBQUMsV0FBTSxHQUFFO29CQUNWLElBQUk7d0JBQ0YsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7d0JBQ2xCLE1BQU07cUJBQ1A7b0JBQUMsV0FBTSxHQUFFO29CQUNWLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQzthQUN2QjtZQUVELE1BQU0sSUFBSSx1QkFBWSxDQUFDLHlCQUF5QixHQUFHLFFBQVEsTUFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFN0U7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFFakIsQ0FBQztJQUVELFdBQVc7SUFDWCxJQUFJLEdBQUc7UUFFTCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUV6QixDQUFDO0NBRUY7QUFuREQsNENBbURDO0FBRUQsa0JBQTBCLFNBQVEsZ0JBQThCO0NBQUc7QUFBbkUsb0NBQW1FIn0=