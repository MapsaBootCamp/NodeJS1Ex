const cakePrices = [5, 4, 3, 2, 2];
const students = 3;


const findCheapOne = (priceRange: number[], students: number): number => {
  let minPrice: number = 0;
  if (students === 1){
    for (let i = 0;i <priceRange.length - 1;i++){
        if (priceRange[i] > priceRange[i+1]){
            minPrice = priceRange[i];
        }else {
            minPrice = priceRange[i+1];
        }
    }
  }else if(students === 2){
    if (priceRange[0] > priceRange.length -1){
        minPrice = priceRange[0];
    }else{
        minPrice = priceRange.length -1;
    }
  }else {
    for (let j = 0; j < priceRange.length -1;j++){
        if(priceRange[j]<priceRange[j+1]){
            minPrice = priceRange[j];
        }else{
            minPrice = priceRange[j+1];
        }
    }
  }
  return minPrice;
};

console.log(findCheapOne(cakePrices,students));
