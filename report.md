Group 11. The references are online webs and other webs.

setup:
mongod is downloaded there.
you might install DNE packages, ex. if there's no <some_package>,
do: npm install <some_package> (Linux)
run: sh t.sh

note: 1. it should show it got a post req at '/newlog'. 2. if it doesn't, reload the webpage.

del /.git.

Doc:
First of all, for all htmls, there is no editable contents for XSS.
Then I used validations for username and password, and balance, so it's difficult for NoSQL injection, such as username={"$ne": null}.
I also used the parsefloat method for balance, so it difficult for XSS or NoSQL injection.
I performed float arithmetic by the Decimal module, so it's difficult for float arithmetic error.
Lastly, I used bcrypte to encode the password, so that it's more secure. And I seperated the folders for different websites. And I log out the DB logs to the console, etc.


part 1:.


