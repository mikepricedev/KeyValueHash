"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Key_1 = require("./Key");
const ROOT_KEYS = Symbol();
class RootKey extends Key_1.default {
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
exports.default = RootKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vdEtleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Sb290S2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQXdCO0FBRXhCLE1BQU0sU0FBUyxHQUFpQixNQUFNLEVBQUUsQ0FBQztBQUV6QyxhQUE2QixTQUFRLGFBQUc7SUFJdEMsWUFBWSxHQUFVLEVBQUUsUUFBcUI7UUFFM0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRVgsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBRTdCLENBQUM7SUFFRCxDQUFDLFFBQVE7UUFFUCxLQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQztZQUUvQixJQUFHLEdBQUcsS0FBSyxJQUFJLEVBQUM7Z0JBRWQsTUFBTSxHQUFHLENBQUM7YUFFWDtTQUVGO0lBRUgsQ0FBQztDQUVGO0FBNUJELDBCQTRCQyJ9