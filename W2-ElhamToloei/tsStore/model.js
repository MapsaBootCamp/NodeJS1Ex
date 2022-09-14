"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Comment = exports.User = exports.LavazemBarghi = exports.Pushaak = void 0;
var BaseProductModel = /** @class */ (function () {
    function BaseProductModel(name, price, category) {
        this._id = BaseProductModel.idGenerator();
        this.name = name;
        this.price = price;
        this.category = category;
        this.comments = [];
    }
    Object.defineProperty(BaseProductModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    BaseProductModel.idGenerator = function () {
        var result;
        do {
            result = Math.floor(Math.random() * 1e5);
        } while (result < 1e4 - 1);
        return result;
    };
    BaseProductModel.prototype.addComment = function (comment) {
        this.comments.push(comment);
    };
    return BaseProductModel;
}());
var Pushaak = /** @class */ (function (_super) {
    __extends(Pushaak, _super);
    function Pushaak(name, price, gender, colour, brand) {
        var _this = _super.call(this, name, price, "pushaak") || this;
        _this.gender = gender;
        _this.colour = colour;
        _this.brand = brand;
        return _this;
    }
    return Pushaak;
}(BaseProductModel));
exports.Pushaak = Pushaak;
var LavazemBarghi = /** @class */ (function (_super) {
    __extends(LavazemBarghi, _super);
    function LavazemBarghi(name, price, power) {
        var _this = _super.call(this, name, price, "lavazemBarghi") || this;
        _this.power = power;
        return _this;
    }
    return LavazemBarghi;
}(BaseProductModel));
exports.LavazemBarghi = LavazemBarghi;
var User = /** @class */ (function () {
    function User(username) {
        this.username = username;
        this.purchaseHistory = [];
    }
    User.prototype.addToCart = function (product) {
        this.purchaseHistory.push(product.id);
    };
    return User;
}());
exports.User = User;
var Comment = /** @class */ (function () {
    function Comment(user, rating, text) {
        this.user = user;
        this.rating = rating;
        this.text = text;
    }
    return Comment;
}());
exports.Comment = Comment;
