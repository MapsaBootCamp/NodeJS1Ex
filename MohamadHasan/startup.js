class Friend {
  constructor(front, back, money) {
    this.front = front;
    this.back = back;
    this.money = money;
  }
}

const friend1 = new Friend(3, 4, 100);
const friend2 = new Friend(4, 5, 50);
const friend3 = new Friend(3, 6, 90);
// const friend4 = new Friend(3, 3, 50);

let friends = [friend1, friend2, friend3];

function isHaghir(friend1, friend2) {
  if (friend1.front < friend2.front && friend1.back < friend2.back) return true;
  return false;
}

function startupFundRaising(friends) {
  let fund = 0;
  friends.forEach((el, index) => {
    let friendsCopy = [...friends];
    let eligiblePeople = [el];
    friendsCopy.splice(index, 1);
    for (let i = 0; i < friendsCopy.length; i++) {
      if (!isHaghir(el, friendsCopy[i]) && !isHaghir(friendsCopy[i], el)) {
        eligiblePeople.push(friendsCopy[i]);
      }
    }
    for (let j = 1; j < eligiblePeople.length - 1; j++) {
      if (isHaghir(eligiblePeople[j], eligiblePeople[j + 1])) {
        eligiblePeople.splice(j, 1);
      }
    }
    let currentFund = eligiblePeople.reduce((acc, el) => acc + el.money, 0);
    if (currentFund > fund) fund = currentFund;
  });

  return fund;
}

console.log(startupFundRaising(friends));
