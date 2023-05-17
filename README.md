Instructions for Running Web Application
TA Instructions:
Client can can simply click on html files

Other Group Instructions:
Linux Users:
Download node.js(In case its already not embedded in your system)
npm install <dne packages>(Linux) from node.js
You will need a Linux Operating System, virtual box is suggested
copy and paste "mongodb://localhost/mydb"(no quotes) at line 20 of index.js. 
Then run MongoDBServer.sh

Windows Users:
Download MongoDB Community Server 6.0 from the website. The latest version.
Make sure Node.JS is installed in your system.
When you clone the github repository, you will need to reinstall the node packages
Delete the node_modules(because its from linux) and run 'npm install' in the terminal to reinstall all the dependencies including bcrypt module.
Create an account from MongoDB Atlas in order to successfully connect your database to the node.js server.
Once its created, click on connect and "Connect to your application". Follow the instructions and place the link in index.js line 21.
Then in terminal run node index.js. Application should run then in port 3000.



note: 1. it should show it got a post req at '/newlog'. 2. if it doesn't, reload the webpage.

del /.git.


