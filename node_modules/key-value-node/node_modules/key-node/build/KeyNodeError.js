"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeyNodeError extends Error {
    constructor(msg, KEY_NODE) {
        super(msg);
        this.KEY_NODE = KEY_NODE;
    }
    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }
}
exports.default = KeyNodeError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5Tm9kZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0tleU5vZGVFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFrRixTQUFRLEtBQUs7SUFFN0YsWUFBWSxHQUFVLEVBQVcsUUFBcUI7UUFFcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRm9CLGFBQVEsR0FBUixRQUFRLENBQWE7SUFJdEQsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRXRCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFL0IsQ0FBQztDQUVGO0FBZEQsK0JBY0MifQ==