Nqueen(5)
function Nqueen(n){
	const board=Array(n)
	for(let i=0;i<n;i++){
		board[i]=Array(n).fill(0);
	}
	if(solve(board,n, 0)){
		console.log(board);
		return;
	}
	console.log(`there is no solution`);
	return;
}
function solve(board, n, col){
	for(let i=0;i<n;i++){
		if(safety(board,n,i,col)){
			board[i][col]=1
			solve(board,n,col+1)
		}
	}
	return true;
}
function safety(board,n,row,col){
	for(let i=col;i<n;i++){
		if(board[i][col])
			return false;
	}
	for(let i=0;i<n;i++){
		if(board[row][i])
			return false;
	}
	for(let i=row, j=col;i>=0 && j>=0;i--,j--){
		if(board[i][j])
			return false;
	}
	for (i=row, j=col; j>=0 && i<n; i++, j--){
		if(board[i][j]) 
			return false;
	}
	return true;
}