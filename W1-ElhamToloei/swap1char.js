function strOneSwap(s1,s2) {
    s1 = s1.toLowerCase() ; s2 = s2.toLowerCase();  
    if((s1.length !== s2.length) || (new Set(s1).size === s1.length) ||
        (new Set(s2).size === s2.length)) return false;     // tekrari nadasht ya tuleshun namosavi
    const indexes =[]
    for (let i = 0; i < s1.length; i++) {        
        if(s1[i] !== s2[i]){
            indexes.push(i)
            if (indexes.length>2)   return false    //tafavot bishtar az 2ta nabayad bashe
        }
    }
    let str = s1.split('')    //to array
    str[indexes[0]] = s2[indexes[1]]
    str = str.join("")       //to string
    return str
}

// const s1="Hellolool"
// const s2="hellopoop"
// const s1= "mapsm"
// const s2="aapsa"
let s1="MAPSM"
let s2="AAPSA"
console.log(strOneSwap(s1,s2));