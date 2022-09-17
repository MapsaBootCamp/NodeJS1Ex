import _ from "lodash";
import { Pushaak, LavazemBarghi, user, Comment, ProductModel } from "./midule";

const users:user[] = [];
let products:ProductModel[] = [];
const productIdWithCount = new Map();

const addProduct = (product, count) => {
  for (let [productId, productCount] of productIdWithCount) {
    if (product.id === productId) {
      productCount += count;
      return;
    }
  }
  productIdWithCount.set(product.id, count);
  products.push(product);
};
const removeProduct = (productId, count) => {
  if (!productIdWithCount.get(productId)) {
    throw new Error("product NOT found ---> 404");
  }

  let productCount = productIdWithCount.get(productId);
  if (productCount <= count) {
    productIdWithCount.delete(productId);
    products = products.filter((v) => v.id !== productId);
  } else {
    productIdWithCount.set(productId, productCount - count);
  }
};

const addUser = (username) => {
  if (users.filter((v) => v.username === username).length > 0) {
    throw new Error(`this ${username} is already registered`);
  } else {
    users.push(new user(username));
  }
};

const getCommentFromUser = (user) => {
    const result = new Map()
    for(let product of products){
        for(let comment of product.comments){
            if(_.isEqual(comment.user,user))
            result.set(product["name"],comment)
        }
    }
    return result;
};

const getRating = (product)=> {
    if (product.comments.length > 0){
        let sumRate = product.comments.reduce((preCount,currCount,)=> preCount + currCount.rating , 0)
        return sumRate / product.comments.length
    }
    return 3
}

addUser("Gholam");
addUser("Ashkan");
addProduct(new Pushaak("pirhan", 12e4, "Male", "blue", "Nike"), 12)
removeProduct(products[0].id, 11);
products[0]?.addComment(new Comment(users[0], 4, "razi budam"))
products[0]?.addComment(new Comment(users[1], 1, "razi nabudam"))


console.log(users);
console.log(productIdWithCount);
console.log(getCommentFromUser(users[0]))
console.log(getRating(products[0]))