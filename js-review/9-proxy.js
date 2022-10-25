// const bankAcount = {
//   balance: 2020,
//   name: "Georgy Glezer",
// };

// const handler = {
//   set: function (obj, prop, value) {
//     console.log(`Current Balance: ${obj.balance}, New Balance: ${value}`);

//     if (value < 0) {
//       console.log(`We dont allow Negative Balance!`);
//       return false;
//     }

//     obj[prop] = value;
//     return true;
//   },
//   get: function (target, prop, reciever) {
//     if (prop === "balance") {
//       console.log(`Current Balance Of: ${target.name} Is: ${target.balance} `);
//     }

//     return target[prop];
//   },
// };

// const wrappedBankAcount = new Proxy(bankAcount, handler);

// wrappedBankAcount.balance -= 2000;
// console.log(wrappedBankAcount.balance);
// wrappedBankAcount.balance -= 50;
// console.log(wrappedBankAcount.balance);

// const bankAccount = {
//   balance: 10,
//   name: "Georgy Glezer",
//   get dollars() {
//     console.log("Calculating Dollars");
//     return this.balance * 3.43008459;
//   },
// };

// let cache = {
//   currentBalance: null,
//   currentValue: null,
// };

// const handler = {
//   get: function (obj, prop) {
//     if (prop === "dollars") {
//       let value =
//         cache.currentBalance !== obj.balance ? obj[prop] : cache.currentValue;

//       cache.currentValue = value;
//       cache.currentBalance = obj.balance;

//       return value;
//     }

//     return obj[prop];
//   },
// };

// const wrappedBankAcount = new Proxy(bankAccount, handler);

// console.log(wrappedBankAcount.dollars);
// console.log(wrappedBankAcount.dollars);
// console.log(wrappedBankAcount.dollars);
// console.log(wrappedBankAcount.dollars);

// OUTPUT:
// Calculating Dollars
// 34.3008459
// 34.3008459
// 34.3008459
// 34.3008459

const target = {
  color: ["red", "green", "blue"],
};

const handler = {};

const proxy = new Proxy(target, handler);

console.log(proxy.color);
console.log(proxy.color === target.color);
console.log(typeof proxy);
console.log(proxy == target);