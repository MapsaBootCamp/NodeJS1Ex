// https://quera.org/problemset/147637/

function countMinBanner(m , n ,a, b) {
    let i = 0
    for (; m>=a; i++) {		//m/(a+a-1)
        m=m-(a+a-1)
    }
    let j = 0
    for (; n>=b; j++) { 	//n/(b+b-1)
        n=n-(b+b-1)
    }
    return (i*j);
}

console.log(countMinBanner(5,7,2,1));
