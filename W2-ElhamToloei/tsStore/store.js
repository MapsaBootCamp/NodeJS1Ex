"use strict";
var _a, _b;
exports.__esModule = true;
var lodash_1 = require("lodash");
var model_1 = require("./model");
var users = [];
var products = [];
var productsIdWithCount = new Map();
function addProduct(product, count) {
    for (var _i = 0, productsIdWithCount_1 = productsIdWithCount; _i < productsIdWithCount_1.length; _i++) {
        var _a = productsIdWithCount_1[_i], productId = _a[0], productCount = _a[1];
        if (product.id === productId) {
            productCount += count;
            return;
        }
    }
    productsIdWithCount.set(product.id, count);
    products.push(product);
}
function removeProduct(productId, count) {
    if (!productsIdWithCount.get(productId))
        throw new Error("kalaye morede nazar yaft nashod ----> 404");
    var productCount = productsIdWithCount.get(productId);
    if (productCount <= count) {
        productsIdWithCount["delete"](productId);
        products = products.filter(function (v) { return v.id !== productId; });
    }
    else {
        productsIdWithCount.set(productId, productCount - count);
    }
}
function addUser(username) {
    if (users.filter(function (v) { return v.username === username; }).length > 0)
        throw new Error("in user ba username ".concat(username, " \n                                                ghablan sabtnam karde"));
    users.push(new model_1.User(username));
}
function getCommentsOfUser(user) {
    var result = new Map();
    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
        var product = products_1[_i];
        for (var _a = 0, _b = product.comments; _a < _b.length; _a++) {
            var comment = _b[_a];
            if (lodash_1["default"].isEqual(comment.user, user))
                result.set(product["name"], comment);
        }
    }
    return result;
}
function getRating(product) {
    if (product.comments.length > 0) {
        var sumRate = product.comments.reduce(function (prevCount, cuurentComment) { return prevCount + cuurentComment.rating; }, 0);
        return sumRate / product.comments.length;
    }
    return 3;
}
addUser("Gholam");
addUser("Ashkan");
addProduct(new model_1.Pushaak("pirhan", 12e4, "Male", "blue", "Nike"), 12);
removeProduct(products[0].id, 11);
(_a = products[0]) === null || _a === void 0 ? void 0 : _a.addComment(new model_1.Comment(users[0], 4, "razi budam"));
(_b = products[0]) === null || _b === void 0 ? void 0 : _b.addComment(new model_1.Comment(users[1], 1, "razi nabudam"));
console.log(users);
console.log(productsIdWithCount);
console.log(getCommentsOfUser(users[0]));
console.log(getRating(products[0]));
