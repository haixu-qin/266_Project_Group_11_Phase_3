'use strict';
class Account {
  constructor(username, balance) {
    this.username = username;
    this.balance = balance;
  }

  deposit(amount) {
    let sum = this.flt(this.balance, amount, '+');


    if (amount >=0 && amount <= 4294967295.99 && sum <= 4294967295.99) {

      this.balance = sum;
      alert(this.checkBalance());
      return true;
    } else {
      return false;
    }
  }

  withdraw(amount) {
    let diff = this.flt(this.balance, amount, '-');
    if (amount >=0 && amount <= 4294967295.99 && diff >= 0) {

this.balance = diff;
      alert(this.checkBalance());
      return true;
    } else {
      console.log(amount);
      return false;
    }
  }

  checkBalance() {
    return this.balance.toFixed(2);
  }
  flt(a1, b1, symbol) {
const a = new Decimal(a1.toString());
const b = new Decimal(b1.toString());
if (symbol=='+') {
const sum = a.plus(b);
console.log(sum.toString());
return sum;
}
else if (symbol=='-') {
const difference = a.minus(b);
console.log(difference.toString());
return difference;
}

return "Invalid symbol";
}
}
const txt = localStorage.getItem('username');
console.info(txt);
let res2;
async function f1(url, data) {
  console.log("about to send post request");
  let res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: data
  });
    return res.text();
}
let f2 = async () => {
  let data = JSON.stringify({ username: txt });
  res2 = await f1('/getbal', data);
  res2 = parseFloat(res2);
  console.log(res2);


}
let numberInputChecker = (n) => {
 if (n[0]=='0' || n[0]=='.') {
   return false;
 }
  return true;
}
let decimalPointFunction = (n) => {
  var dot = false;
  var fs = 0;
  var i=-1;
  while (++i<n.length) {

    if (n[i] == '.' && !dot) { dot=true; }
    else if (n[i] == '.' && dot) { return true; }
    else if (dot) { fs++; }

  }
  if (fs==2) {
              return false; }
  return true;
}
let f3 = async () => {
await f2();
const account = new Account(txt, res2);
console.log(account.checkBalance().toString());

const h2 = document.getElementById('t');

document.getElementById('t').style.display = "none";


let ad = document.getElementById('add');
ad.addEventListener('click', async function() {
  console.log('ad button clicked');
  let amount =
document.getElementById('a1').value;
  if (!amount || (parseFloat(amount))<=0 || !numberInputChecker(amount) || decimalPointFunction(amount)) {

    alert("invalid_input");
    return;
  }
  console.log("amount="+amount);

  let res1 = account.deposit(parseFloat(amount));
  console.log(res1);
  if (res1) {

    let data1 = account.checkBalance().toString();
    let data2 = JSON.stringify({ balance: data1 });
    res2 = await f1('/postbal', data2);
  }
  else {

    alert("invalid_input");
  }
});

let subtract = document.getElementById('subtract');
subtract.addEventListener('click', async function() {
  console.log('subtract button clicked');
  let amount =
document.getElementById('a2').value;
  if (!amount || (parseFloat(amount))<=0 || !numberInputChecker(amount) ||  decimalPointFunction(amount)) {

    alert("invalid_input");
    return;
  }
  console.log("amount="+amount);

  let res1 = account.withdraw(parseFloat(amount));
  console.log(res1);
  if (res1) {

    let data1 = account.checkBalance().toString();
    let data2 = JSON.stringify({ balance: data1 });
    res2 = await f1('/postbal', data2);




  }
  else {

    alert("invalid_input");
  }
});

let bal = document.getElementById('bal');
bal.addEventListener('click', function() {
  console.log('bal button clicked');
  alert(account.checkBalance());
});

let logout = document.getElementById('logout');
logout.addEventListener('click', function() {
  console.log('Logout button clicked');


  const confirmed = confirm('log out?');
  if (confirmed) {

    window.location.href = "/UserAccountInfo.html";
  }
});
document.getElementById('logout').style.display = "inline-block";
}
f3();
