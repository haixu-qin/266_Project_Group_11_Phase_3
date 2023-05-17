async function sendPostRequest(url, data) {
  console.log("about to send post request");
  let response = await fetch(url, {
     method: 'POST',
     headers: {
        'Content-Type': 'text/plain'
     },
     body: data
  });
  return response.text();
}
console.log("starting up");
sendPostRequest('/newlog', 'running')
  .then(function (data) {
     console.log("got back the following string");
     console.log(data);
  })
  .catch(function (error) {
     console.error('Error:', error);
  });

//validating and sanitizing the username and password by utilizing the regex per style guidelines
function validationAndSanitization(str) {

  if (!str || str.length < 1 || str.length > 127) {
     return false;
  }

  const regex = /^[a-z0-9_.-]+$/;
  if (!regex.test(str)) {
     return false;
  }

  return true;
}
//checking to see if the input for numbers is valid or not per assignment guidelines of valid numbers or invalid numbers
let numberInputChecker = (n) => {
  if (n[0] == '0' || n[0] == '.') {
     return false;
  }
  return true;
}
//checking decimal point location of an input per assignment guidelines
let decimalPointFunction = (n) => {
  var dot = false;
  var fs = 0;
  var i = -1;
  while (++i < n.length) {

     if (n[i] == '.' && !dot) {
        dot = true;
     } else if (n[i] == '.' && dot) {
        return true;
     } else if (dot) {
        fs++;
     }

  }
  if (fs == 2) {
     return false;
  }
  return true;
}
//function checking for validation of the username, password, and balance.
function f1() {

  const username = document.getElementById('account-name').value;
  const password = document.getElementById('password').value;
  const balance = document.getElementById('balance').value;

  if (!validationAndSanitization(username) || !validationAndSanitization(password)) {
     alert("invalid_input");
     return null;
  }

  let amount = balance;
  if (!amount || (parseFloat(amount)) < 0 || (parseFloat(amount)) > 4294967295.99 || !numberInputChecker(amount) || decimalPointFunction(amount)) {
     alert("invalid_input");
     return null;
  }
  const user = {
     username: username,
     password: password,
     balance: balance
  };
  let str = JSON.stringify({
     user
  })
  console.info(user);

  return user;
}
//function checks to see if user data is valid. If so, it fetch's data from database related to user. If not it returns null.
async function f2(url) {
  console.log("about to send post request");
  let user = f1();
  if (!user) {
     return null;
  }
  const response = await fetch(url, {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json'
     },
     body: JSON.stringify({
        user
     })
  });
  return response;
}
const form1 = document.getElementById('form');
const reg = document.getElementById('reg');
form1.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
     const response = await f2('/log');

     if (!response) {
        return;
     }
     if (response.status === 201) {
        const username = document.getElementById('account-name').value;
        console.log(1);
        localStorage.setItem('username', username);
        console.log(2);
        window.location.href = 'AccountBalance/AccountBalanceInfo.html';
     } else if (response.status === 202) {
        alert('Username and password do not match!');
     }
  } catch (error) {
     console.error('Error submitting form 1:', error);
  }
});
reg.addEventListener('click', async (evt) => {
  console.info('4');

  evt.preventDefault();
  console.info('5');

  try {
     const response = await f2('/reg');
     console.info('6');
     if (!response) {
        return;
     }
     const txt = await response.text();
     alert(txt);
  } catch (error) {
     console.error('Error submitting form 2:', error);
  }
});
const button = document.getElementById('test');
button.addEventListener('click', async () => {
  const data = {
     foo: 'bar'
  };
  fetch('/log', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(response => console.log(response))
     .catch(error => console.error(error));
});
button.style.display = "none";