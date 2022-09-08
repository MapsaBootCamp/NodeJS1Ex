let line="RLLRRLRLRRRLRLLRLLRR"
lineValue(line)
function lineValue(line){
	line=line.split("")
	let n=line.length;
	const valueArr=[];
	valueArr[0]=0;
	for(let i=0;i<n;i++){
		if(line[i]==='R')
			valueArr[0]+=n-i-1
		else
			valueArr[0]+=i
	}
	for(let k=1;k<=n;k++){
		let lIndex=line.indexOf("L")
		let rIndex=line.lastIndexOf("R")
			if(lIndex<Math.floor(n/2) && lIndex<=(n-rIndex-1)){
				line[lIndex]="R"
				valueArr[k]=valueArr[k-1]+n-1-(2*lIndex)
				printVal(line,k,valueArr);
				continue;
				}
			else if(rIndex>=Math.floor(n/2) && (n-rIndex-1)<lIndex){
				line[rIndex]="L"
				valueArr[k]=valueArr[k-1]+rIndex-(n-rIndex-1)
				printVal(line,k,valueArr);
				continue;
			}
			else
			valueArr[k]=valueArr[k-1];
			printVal(line,k,valueArr);
}
}
function printVal(line,k,valueArr){
	console.log(`with ${k} change the most value is ${valueArr[k]}
and changed array is ${line}
	************`)
}
