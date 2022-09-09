const str = "([]{}{()})";
const stack = [];

const openChars = ['(', '{', '['];
const closeChars = [')', '}', ']'];

function check(str) {
    for (let i = 0; i <= str.length; i++) {
        const char = str[i];
    
        if (openChars.includes(char)) {
            stack.push(char);
            continue;
        }
    
        if (closeChars.includes(char)) {
            const topStack = stack[stack.length - 1];
            if (openChars[closeChars.indexOf(char)] === topStack) {
                stack.pop();
            } else {
                console.log(stack)
                return false
            }
        }
    }
    return (stack.length === 0)
}

console.log(check(str))



// const exp= ["a","b","c","(","[","]","{","[","{","}","]",")"]

// const open = ["(","[","{"]
// const close = ["}","]",")"]

// const stack = [] 

// for (const item of exp) {
//     stack.push(item)
//     if (close.includes(item) && stack[stack.length -2]== open.includes(item)) {
//         console.log(true)
//     }
//     console.log(false)
// }