"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Q = /** @class */ (function () {
    function Q() {
        this._items = [];
    }
    Object.defineProperty(Q.prototype, "isEmpty", {
        get: function () {
            return this.items.length <= 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Q.prototype, "length", {
        get: function () {
            return this.items.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Q.prototype, "items", {
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Q.prototype.enqueue = function (item) {
        this.items.push(item);
    };
    Q.prototype.dequeue = function () {
        this.items.shift();
    };
    Q.prototype.peek = function () {
        return this.items[0];
    };
    Q.prototype.shuffle = function () {
        var _a;
        for (var i = this.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            _a = __read([this.items[rand], this.items[i]], 2), this.items[i] = _a[0], this.items[rand] = _a[1];
        }
    };
    return Q;
}());
exports.default = Q;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL211c2ljL3EudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtRQUNVLFdBQU0sR0FBUSxFQUFFLENBQUM7SUE4QjNCLENBQUM7SUE1QkMsc0JBQUksc0JBQU87YUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUkscUJBQU07YUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxvQkFBSzthQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsbUJBQU8sR0FBUCxVQUFRLElBQU87UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsbUJBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGdCQUFJLEdBQUo7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELG1CQUFPLEdBQVA7O1FBQ0UsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsaURBQXFFLEVBQXBFLHFCQUFhLEVBQUUsd0JBQWdCLENBQXFDO1NBQ3RFO0lBQ0gsQ0FBQztJQUNILFFBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDIn0=