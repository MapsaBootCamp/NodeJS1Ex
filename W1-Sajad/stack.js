const str = "([]{}{()})";
const stack = [];

const openChars = ['(', '{', '['];
const closeChars = [')', '}', ']'];

function mirrorCheck(str) {
    for (let i = 0; i <= str.length; i++) {
        const char = str[i];
    
        if (openChars.includes(char)) {
            stack.push(char);
        }
    
        else if (closeChars.includes(char)) {
            const topStack = stack[stack.length - 1];
            if (openChars[closeChars.indexOf(char)] === topStack) {
                stack.pop();
            } else {
                return false
            }
        }
    }
    if(stack.length>0) return false
}

console.log(mirrorCheck(str))